import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import assert from 'node:assert/strict';
import { test } from 'node:test';
const root = new URL('../', import.meta.url);
const sandbox = { window: {} };
runInNewContext(readFileSync(new URL('assets/05-memory/stack-demo/trace.js', root), 'utf8'), sandbox);
const trace = JSON.parse(JSON.stringify(sandbox.window.STACK_TRACE));
const at = index => trace.steps[index];
const slot = (state, address) => state.slots.find(item => item.address === address);
test('the displayed source is the actual external C++ file', () => {
    assert.equal(trace.source, readFileSync(new URL('examples/05-memory/function-call.cpp', root), 'utf8'));
});
test('arguments and System V alignment before call', () => {
    assert.equal(at(8).registers.rdi, 40);
    assert.equal(at(8).registers.rsi, 2);
    assert.equal(at(8).registers.rsp % 16, 0);
});
test('call pushes the continuation and enters add', () => {
    const state = at(9);
    assert.equal(state.function, '_Z3addii');
    assert.equal(state.pc, 0);
    assert.equal(state.registers.rsp, at(8).registers.rsp - 8);
    assert.equal(slot(state, state.registers.rsp).value, 'main:9');
});
test('callee frame keeps main frame and local copies of arguments', () => {
    const state = at(14);
    assert.equal(state.registers.rbp, 0xfe0);
    assert.equal(state.registers.rsp, 0xfd4);
    assert.equal(slot(state, 0xfe0).value, 0x1000);
    assert.equal(slot(state, 0xfdc).value, 40);
    assert.equal(slot(state, 0xfd8).value, 2);
});
test('addition produces 42 and ret restores the caller stack', () => {
    assert.equal(at(16).registers.rax, 42);
    const state = at(21);
    assert.equal(state.function, 'main');
    assert.equal(state.pc, 9);
    assert.equal(state.registers.rsp, at(8).registers.rsp);
    assert.equal(state.registers.rbp, at(8).registers.rbp);
    assert.equal(state.registers.rax, 42);
    assert.equal(slot(at(22), 0xff0).value, 42);
});
test('main returns 42 and restores the external caller', () => {
    const state = at(26);
    assert.equal(state.function, 'done');
    assert.equal(state.registers.rsp, at(0).registers.rsp + 8);
    assert.equal(state.registers.rbp, at(0).registers.rbp);
    assert.equal(state.registers.rax, 42);
});
test('every snapshot has disjoint memory cells and immutable prior history', () => {
    for (const state of trace.steps) {
        const cells = [...state.slots].sort((a, b) => a.address - b.address);
        for (let i = 1; i < cells.length; i++) {
            assert.ok(cells[i - 1].address + cells[i - 1].size <= cells[i].address);
        }
    }
    assert.equal(slot(at(3), 0xff0).value, null);
    assert.equal(slot(at(22), 0xff0).value, 42);
});
