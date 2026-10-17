import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import assert from 'node:assert/strict';
import { test } from 'node:test';
const root = new URL('../', import.meta.url);
const sandbox = { window: {} };
runInNewContext(readFileSync(new URL('assets/05-memory/stack-demo/trace.js', root), 'utf8'), sandbox);
const trace = JSON.parse(JSON.stringify(sandbox.window.STACK_TRACE));
const after = (fn, instruction) => {
    const state = trace.steps.findLast(state => state.executed?.function === fn && state.executed.instruction === instruction);
    assert.ok(state, `${fn}: ${instruction}`);
    return state;
};
const slot = (state, address) => state.slots.find(item => item.address === address);
test('the slide and animation use the same C++ source and saved Godbolt listing', () => {
    assert.equal(trace.source, readFileSync(new URL('examples/05-memory/function-call.cpp', root), 'utf8'));
    assert.equal(trace.assembly, readFileSync(new URL('examples/05-memory/function-call-godbolt.s', root), 'utf8'));
    for (const fn of ['main', '_Z3addii']) {
        assert.deepEqual(trace.steps.filter(state => state.executed?.function === fn && state.executed.part !== 1).map(state => state.executed.instruction), trace.functions[fn]);
    }
});
test('arguments and System V alignment before call', () => {
    const state = after('main', 'mov edi, eax');
    assert.equal(state.registers.rdi, 40);
    assert.equal(state.registers.rsi, 2);
    assert.equal(state.registers.rdx, 2);
    assert.equal(state.registers.rsp % 16, 0);
});
test('call pushes the continuation and enters add', () => {
    const state = after('main', 'call _Z3addii');
    assert.equal(state.function, '_Z3addii');
    assert.equal(state.pc, 0);
    assert.equal(state.registers.rsp, 0xfe8);
    const target = slot(state, state.registers.rsp).value;
    assert.equal(target, 'main:10');
    assert.equal(trace.functions.main[Number(target.split(':')[1])], 'mov dword ptr [rbp - 12], eax');
});
test('add uses the red zone without reserving stack space', () => {
    const state = after('_Z3addii', 'mov dword ptr [rbp - 24], esi');
    assert.equal(state.registers.rbp, 0xfe0);
    assert.equal(state.registers.rsp, 0xfe0);
    assert.equal(slot(state, 0xfe0).value, 0x1000);
    for (const [address, value] of [[0xfcc, 40], [0xfc8, 2]]) {
        const cell = slot(state, address);
        assert.equal(cell.value, value);
        assert.equal(cell.active, true);
        assert.equal(cell.redZone, true);
        assert.ok(address < state.registers.rsp && address >= state.registers.rsp - 128);
    }
});
test('EDX and EAX carry the operands shown on the slide', () => {
    const loaded = after('_Z3addii', 'mov eax, dword ptr [rbp - 24]');
    assert.equal(loaded.registers.rdx, 40);
    assert.equal(loaded.registers.rax, 2);
    assert.equal(after('_Z3addii', 'add eax, edx').registers.rax, 42);
    const stored = slot(after('_Z3addii', 'mov dword ptr [rbp - 4], eax'), 0xfdc);
    assert.equal(stored.value, 42);
    assert.equal(stored.redZone, true);
});
test('ret restores main and retires the callee red zone', () => {
    const state = after('_Z3addii', 'ret');
    assert.equal(state.function, 'main');
    assert.equal(state.pc, 10);
    assert.equal(state.registers.rsp, 0xff0);
    assert.equal(state.registers.rbp, 0x1000);
    assert.equal(state.registers.rax, 42);
    for (const address of [0xfcc, 0xfc8, 0xfdc]) {
        assert.equal(slot(state, address).active, false);
        assert.equal(slot(state, address).redZone, false);
    }
    assert.equal(slot(after('main', 'mov dword ptr [rbp - 12], eax'), 0xff4).value, 42);
});
test('leave restores the external frame, then main returns 42', () => {
    const state = after('main', 'leave');
    assert.equal(state.registers.rsp, trace.steps[0].registers.rsp);
    assert.equal(state.registers.rbp, trace.steps[0].registers.rbp);
    assert.equal(slot(state, 0xff4).active, false);
    const final = trace.steps.at(-1);
    assert.equal(final.function, 'done');
    assert.equal(final.registers.rsp, trace.steps[0].registers.rsp + 8);
    assert.equal(final.registers.rbp, trace.steps[0].registers.rbp);
    assert.equal(final.registers.rax, 42);
});
test('leave first releases locals, then restores the saved frame pointer', () => {
    const phases = trace.steps.filter(state => state.executed?.instruction === 'leave');
    assert.equal(phases.length, 2);
    const [locals, saved] = phases;
    assert.equal(locals.executed.part, 1);
    assert.equal(locals.executed.effect, 'mov rsp, rbp');
    assert.equal(locals.registers.rsp, 0x1000);
    assert.equal(locals.registers.rbp, 0x1000);
    assert.deepEqual([...locals.releasedSlots].sort((a, b) => a - b), [0xff0, 0xff4, 0xff8, 0xffc]);
    assert.equal(slot(locals, 0x1000).active, true);
    assert.equal(slot(locals, 0x1008).active, true);
    assert.equal(saved.executed.part, 2);
    assert.deepEqual(saved.releasedSlots, [0x1000]);
    assert.equal(saved.registers.rbp, 0x1080);
    assert.equal(saved.registers.rsp, 0x1008);
    assert.equal(saved.registers.rax, 42);
});
test('unwinding hides only retired slots and leaves their bytes unchanged', () => {
    for (let i = 1; i < trace.steps.length; i++) {
        const previous = trace.steps[i - 1], current = trace.steps[i];
        const expected = previous.slots.filter(cell => cell.active && !slot(current, cell.address).active).map(cell => cell.address);
        assert.deepEqual(current.releasedSlots, expected);
        for (const address of expected) assert.equal(slot(current, address).value, slot(previous, address).value);
    }
    assert.deepEqual(trace.steps.at(-1).slots.filter(cell => cell.active), []);
    const returned = after('_Z3addii', 'ret');
    assert.ok(returned.slots.filter(cell => cell.frame === '_Z3addii').every(cell => !cell.active));
    assert.ok(returned.slots.some(cell => cell.frame === 'main' && cell.active));
});
test('snapshots have disjoint memory cells and preserve earlier values', () => {
    for (const state of trace.steps) {
        const cells = [...state.slots].sort((a, b) => a.address - b.address);
        for (let i = 1; i < cells.length; i++) {
            assert.ok(cells[i - 1].address + cells[i - 1].size <= cells[i].address);
        }
    }
    assert.equal(slot(after('main', 'sub rsp, 16'), 0xff4).value, null);
    assert.equal(slot(trace.steps.at(-1), 0xff4).value, 42);
});
