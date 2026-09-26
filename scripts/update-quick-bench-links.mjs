import {readFile, writeFile} from 'node:fs/promises';
import {dirname, resolve} from 'node:path';

// Quick Bench imports base64-encoded JSON from the URL fragment:
// https://github.com/FredTingaud/quick-bench-front-end/blob/master/components/HashParser.js
async function inlineSource(path, seen = new Set()) {
    path = resolve(path);
    if (seen.has(path)) return '';
    seen.add(path);
    const lines = (await readFile(path, 'utf8')).split('\n');
    const result = [];
    for (const line of lines) {
        const include = line.match(/^#include "([^"]+)"$/);
        if (include) result.push(await inlineSource(resolve(dirname(path), include[1]), seen));
        else if (line !== '#pragma once' && line !== 'BENCHMARK_MAIN();') result.push(line);
    }
    return result.join('\n');
}

const lecture = 'lectures/04-struct-union.md';
let markdown = await readFile(lecture, 'utf8');
for (const [id, source] of [
    ['quick-bench-name-comparison', 'name-comparison-quick-bench.cpp'],
    ['quick-bench-packing', 'packing-benchmark.cpp'],
]) {
    const seen = new Set();
    let text = await inlineSource(`examples/04-struct-union/${source}`, seen);
    if (id === 'quick-bench-packing') {
        text += '\n' + await inlineSource('examples/04-struct-union/packed-sum-benchmark.cpp', seen);
    }
    // HashParser uses atob, so keep JSON ASCII and escape Unicode comments.
    const settings = {text, cppVersion: '20', optim: '2'};
    if (id === 'quick-bench-packing') {
        settings.compiler = 'gcc-13.2';
        settings.cppVersion = '23';
        settings.optim = '3';
    }
    const json = JSON.stringify(settings)
        .replace(/[^\x00-\x7f]/g, char => '\\u' + char.charCodeAt(0).toString(16).padStart(4, '0'));
    const url = 'https://quick-bench.com/#' + Buffer.from(json, 'ascii').toString('base64');
    const definition = `[${id}]: <${url}>`;
    const pattern = new RegExp(`^\\[${id}\\]:.*$`, 'm');
    markdown = pattern.test(markdown)
        ? markdown.replace(pattern, definition)
        : markdown.trimEnd() + '\n\n' + definition + '\n';
}
await writeFile(lecture, markdown);
