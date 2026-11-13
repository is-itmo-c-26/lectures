import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {mkdtempSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {test} from 'node:test';
import {fileURLToPath} from 'node:url';

const generator = fileURLToPath(new URL('update-godbolt-links.mjs', import.meta.url));
const flags = ['-std=c++20', '-Wall', '-Wextra', '-pedantic', '-Werror'];

function editorSource(url) {
    const state = decodeURIComponent(url.split('#')[1].replaceAll('+', ' '));
    const start = state.indexOf("source:'");
    assert.notEqual(start, -1);
    let source = '';
    for (let index = start + 8; index < state.length; index += 1) {
        if (state[index] === "'") return source;
        if (state[index] === '!') index += 1;
        source += state[index];
    }
    throw new Error('Unterminated editor source');
}

test('multi-file examples run identically after combining headers and implementations', () => {
    const directory = mkdtempSync(join(tmpdir(), 'godbolt-links-'));
    try {
        writeFileSync(join(directory, 'value.hpp'), '#pragma once\nstruct Value { int number; };\n');
        writeFileSync(join(directory, 'box.hpp'), '#pragma once\n#include "value.hpp"\nstruct Box { Value value; Box(); };\n');
        writeFileSync(join(directory, 'box.cpp'), '#include "box.hpp"\nBox::Box() : value{42} {}\n');
        writeFileSync(join(directory, 'main.cpp'), '#include "value.hpp"\n#include "box.hpp"\n#include <iostream>\nint main() { std::cout << Box{}.value.number << \'!\'; }\n');
        // Each link needs its own header expansion; the second also preserves compiler mode.
        const document = ['executor', 'compiler'].map(mode =>
            `[godbolt-${mode}]: <https://godbolt.org/>\n` +
            `<!-- godbolt source="main.cpp" compiler="clang2310" options="-std=c++20" extra-sources="box.cpp"${mode === 'compiler' ? ' mode="compiler"' : ''} -->`
        ).join('\n\n');
        const markdown = join(directory, 'lecture.md');
        writeFileSync(markdown, document);
        execFileSync(process.execPath, [generator, markdown]);
        const generated = readFileSync(markdown, 'utf8');
        const urls = [...generated.matchAll(/^\[godbolt-\w+\]: <([^>]+)>$/gm)].map(match => match[1]);
        assert.equal(urls.length, 2);
        execFileSync('clang++', [...flags, join(directory, 'main.cpp'), join(directory, 'box.cpp'), '-o', join(directory, 'local')]);
        const expected = execFileSync(join(directory, 'local'), {encoding: 'utf8'});
        assert.equal(expected, '42!');
        for (const url of urls) {
            const combined = join(directory, 'combined.cpp');
            writeFileSync(combined, editorSource(url));
            execFileSync('clang++', [...flags, combined, '-o', join(directory, 'combined')]);
            assert.equal(execFileSync(join(directory, 'combined'), {encoding: 'utf8'}), expected);
        }
        assert.match(generated, /extra-sources="box.cpp" mode="compiler"/);
        execFileSync(process.execPath, [generator, markdown]);
        assert.equal(readFileSync(markdown, 'utf8'), generated);
    } finally {
        rmSync(directory, {recursive: true, force: true});
    }
});
