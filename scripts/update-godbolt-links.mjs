#!/usr/bin/env node

import {readdir, readFile, writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';

const requestedFiles = process.argv.slice(2);
const markdownFiles = requestedFiles.length > 0
    ? requestedFiles
    : (await readdir('.')).filter(file => file.endsWith('.md'));

const minifiedKeys = [
    'settings',
    'hasHeaders',
    'constrainDragToContainer',
    'selectionEnabled',
    'dimensions',
    'borderWidth',
    'minItemHeight',
    'minItemWidth',
    'headerHeight',
    'dragProxyWidth',
    'dragProxyHeight',
    'labels',
    'close',
    'maximise',
    'minimise',
    'popout',
    'content',
    'componentName',
    'componentState',
    'id',
    'width',
    'type',
    'height',
    'isClosable',
    'title',
    'popoutWholeStack',
    'openPopouts',
    'parentId',
    'activeItemIndex',
    'reorderEnabled',
    'borderGrabWidth',
];

const minifiedValues = [true, false, 'row', 'column', 'stack', 'component', 'close', 'maximise', 'minimise', 'open in new window'];

function minify(value) {
    if (Array.isArray(value)) {
        return value.map(minify);
    }

    if (value !== null && typeof value === 'object') {
        return Object.fromEntries(Object.entries(value).map(([key, item]) => [minifyAtom(key, minifiedKeys), minify(item)]));
    }

    return minifyAtom(value, minifiedValues);
}

function minifyAtom(value, dictionary) {
    if (typeof value === 'string' && value.length === 1) {
        return `___${value}`;
    }

    const index = dictionary.indexOf(value);
    return index === -1 ? value : index.toString(36);
}

function encodeRison(value) {
    if (value === null) return '!n';
    if (value === true) return '!t';
    if (value === false) return '!f';

    if (typeof value === 'number') {
        return Number.isFinite(value) ? String(value).replace('+', '') : '!n';
    }

    if (typeof value === 'string') {
        if (value === '') return "''";
        if (/^[^\-0123456789 '!:(),*@$][^ '!:(),*@$]*$/.test(value)) return value;
        return `'${value.replace(/([!'])/g, '!$1')}'`;
    }

    if (Array.isArray(value)) {
        return `!(${value.map(encodeRison).join(',')})`;
    }

    const entries = Object.entries(value)
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, item]) => `${encodeRison(key)}:${encodeRison(item)}`);
    return `(${entries.join(',')})`;
}

function quoteRison(value) {
    if (/^[-A-Za-z0-9~!*()_.',:@$/]*$/.test(value)) return value;
    return encodeURIComponent(value)
        .replaceAll('%2C', ',')
        .replaceAll('%3A', ':')
        .replaceAll('%40', '@')
        .replaceAll('%24', '$')
        .replaceAll('%2F', '/')
        .replaceAll('%20', '+');
}

function makeGodboltUrl(source, compiler, options) {
    const content = [
        {
            type: 'row',
            content: [
                {
                    type: 'component',
                    componentName: 'codeEditor',
                    componentState: {
                        id: 1,
                        source,
                        options: {compileOnChange: true},
                        lang: 'c++',
                    },
                },
                {
                    type: 'component',
                    componentName: 'executor',
                    componentState: {
                        source: 1,
                        tree: 0,
                        compiler,
                        libs: [],
                        options,
                        lang: 'c++',
                        compilationPanelShown: true,
                        compilerOutShown: true,
                    },
                },
            ],
        },
    ];

    const state = minify({content});
    state.version = 4;
    const hash = quoteRison(encodeRison(state).slice(1, -1));
    return `https://godbolt.org/#${hash}`;
}

const definitionPattern = /^(\[godbolt-[^\]]+\]:)\s+<[^>]*>[ \t]*(?:\r?\n)?<!--\s+godbolt\s+source="([^"]+)"\s+compiler="([^"]+)"\s+options="([^"]*)"\s+-->$/gm;

for (const markdownFile of markdownFiles) {
    const markdownPath = resolve(markdownFile);
    const markdown = await readFile(markdownPath, 'utf8');
    const definitions = [];
    let replacements = 0;

    const linksUpdated = await replaceAsync(markdown, definitionPattern, async (match, label, sourcePath, compiler, options) => {
        const source = await readFile(resolve(sourcePath), 'utf8');
        const url = makeGodboltUrl(source, compiler, options);
        definitions.push({reference: label.slice(1, -2), sourcePath});
        replacements += 1;
        return `${label} <${url}>\n<!-- godbolt source="${sourcePath}" compiler="${compiler}" options="${options}" -->`;
    });

    if (replacements === 0) continue;

    const updated = placeGodboltButtonsAfterCode(linksUpdated, definitions, markdownFile);

    if (updated !== markdown) {
        await writeFile(markdownPath, updated);
        console.log(`Updated ${replacements} Godbolt link(s) in ${markdownFile}`);
    } else {
        console.log(`Godbolt links are current in ${markdownFile}`);
    }
}

function placeGodboltButtonsAfterCode(markdown, definitions, markdownFile) {
    const buttonPattern = /^\[!\[\]\(assets\/compiler-explorer\.svg\)\{\.godbolt-link-image width="32"\}\]\[(godbolt-[^\]]+)\]\{aria-label="Open in Compiler Explorer"\}[ \t]*$/gm;
    const buttons = new Map();

    let result = markdown.replace(buttonPattern, (button, reference) => {
        buttons.set(reference, button);
        return '';
    });

    for (const {reference, sourcePath} of definitions) {
        const button = buttons.get(reference);
        if (button === undefined) continue;

        const include = `{{< include ${sourcePath} >}}`;
        const includeIndex = result.indexOf(include);
        if (includeIndex === -1) {
            throw new Error(`Cannot find ${include} for ${reference} in ${markdownFile}`);
        }

        const closingFencePattern = /^```[ \t]*$/gm;
        closingFencePattern.lastIndex = includeIndex + include.length;
        const closingFence = closingFencePattern.exec(result);
        if (closingFence === null) {
            throw new Error(`Cannot find the closing code fence for ${reference} in ${markdownFile}`);
        }

        const insertionIndex = closingFence.index + closingFence[0].length;
        const before = result.slice(0, insertionIndex);
        const after = result.slice(insertionIndex).replace(/^(?:[ \t]*\r?\n)+/, '');
        result = `${before}\n\n${button}\n\n${after}`;
        buttons.delete(reference);
    }

    if (buttons.size > 0) {
        throw new Error(`Cannot match Godbolt button(s) in ${markdownFile}: ${[...buttons.keys()].join(', ')}`);
    }

    return result;
}

async function replaceAsync(text, pattern, replacer) {
    const matches = [...text.matchAll(pattern)];
    let result = text;

    for (const match of matches.reverse()) {
        const replacement = await replacer(...match);
        result = result.slice(0, match.index) + replacement + result.slice(match.index + match[0].length);
    }

    return result;
}
