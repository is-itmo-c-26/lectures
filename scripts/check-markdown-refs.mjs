#!/usr/bin/env node
// Проверяет ссылки-сноски в Markdown: каждая использованная `[текст][id]`
// должна быть определена как `[id]: url` в том же файле, а каждое определение
// должно где-то использоваться. Код в fenced-блоках и обратных кавычках
// не сканируется. Без аргументов проверяет lectures/, articles/, videos/
// и Markdown-файлы в корне.

import {readdir, readFile} from 'node:fs/promises';
import {join} from 'node:path';

const requested = process.argv.slice(2);
const markdownFiles = requested.length > 0 ? requested : await collectDefault();

async function collectDefault() {
    const files = [];
    for (const directory of ['lectures', 'articles', 'videos', '.']) {
        const entries = await readdir(directory);
        for (const entry of entries) {
            if (entry.endsWith('.md') && !['README.md', 'AGENTS.md', 'template.md'].includes(entry)) {
                files.push(directory === '.' ? entry : join(directory, entry));
            }
        }
    }
    return files.sort();
}

function stripCode(markdown) {
    return markdown
        .replace(/^(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\1[ \t]*$/gm, '')
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/`[^`\n]*`/g, '');
}

let problems = 0;

for (const file of markdownFiles) {
    const markdown = await readFile(file, 'utf8');
    const text = stripCode(markdown);

    const defined = new Map();
    for (const match of text.matchAll(/^\[([^\]\n]+)\]:[ \t]+\S/gm)) {
        const id = match[1].toLowerCase();
        if (defined.has(id)) report(file, `сноска определена дважды: [${match[1]}]`);
        defined.set(id, (defined.get(id) ?? 0));
    }

    const used = new Map();
    for (const match of text.matchAll(/\]\[([^\]\n]+)\]/g)) {
        const id = match[1].toLowerCase();
        used.set(id, (used.get(id) ?? 0) + 1);
    }
    for (const match of text.matchAll(/\[([^\]\n]+)\]\[\]/g)) {
        const id = match[1].toLowerCase();
        used.set(id, (used.get(id) ?? 0) + 1);
    }

    for (const id of used.keys()) {
        if (!defined.has(id)) report(file, `сноска используется, но не определена: [${id}]`);
    }
    for (const id of defined.keys()) {
        if (!used.has(id)) report(file, `сноска определена, но не используется: [${id}]`);
    }
}

function report(file, message) {
    problems += 1;
    console.log(`${file}: ${message}`);
}

if (problems > 0) {
    console.log(`\nПроблем: ${problems}`);
    process.exit(1);
}

console.log(`Сноски в порядке: ${markdownFiles.length} файлов проверено`);
