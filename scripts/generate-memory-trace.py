#!/usr/bin/env python3
"""Trace the saved Compiler Explorer listing used on the lecture slide."""
import copy
import json
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / 'examples/05-memory/function-call.cpp'
ASSEMBLY = SOURCE.with_name('function-call-godbolt.s')
OUT = ROOT / 'assets/05-memory/stack-demo/trace.js'
assembly = ASSEMBLY.read_text()
functions = {}
current = None
for line in assembly.splitlines():
    line = line.strip()
    if line in ('"main":', '"add(int, int)":'):
        current = 'main' if line == '"main":' else '_Z3addii'
        functions[current] = []
    elif line:
        assert current is not None, 'Expected a function label'
        instruction = re.sub(r'\s+', ' ', line.lower())
        instruction = instruction.replace('"add(int, int)"', '_Z3addii')
        instruction = re.sub(r'\[rbp-(\d+)\]', r'[rbp - \1]', instruction)
        functions[current].append(instruction)

# Names describe this particular unoptimized listing, not a universal ABI layout.
registers = {'rsp': 0x1008, 'rbp': 0x1080, 'rax': None,
             'rdi': None, 'rsi': None, 'rdx': None}
aliases = {'eax': 'rax', 'edi': 'rdi', 'esi': 'rsi', 'edx': 'rdx'}
slots = {0x1008: {'address': 0x1008, 'size': 8, 'value': 'вызывающий код',
                   'label': 'Адрес возврата из main', 'frame': 'main'}}
labels = {'main': {4: 'a', 8: 'b', 12: 'answer', 16: 'Выравнивание'},
          '_Z3addii': {20: 'a (копия аргумента)', 24: 'b (копия аргумента)', 4: 'result'}}
steps = []
function = 'main'
pc = 0
red_zone_base = None


def snapshot(message, changed_regs=(), changed_slots=(), executed=None):
    cells = copy.deepcopy(list(slots.values()))
    for cell in cells:
        # The leaf function add uses the System V red zone without moving RSP.
        red_zone = (function == '_Z3addii' and registers['rbp'] == red_zone_base
                    and cell['frame'] == '_Z3addii' and cell['size'] == 4)
        cell['active'] = cell['address'] >= registers['rsp'] or red_zone
        cell['redZone'] = red_zone
    previously_active = {cell['address'] for cell in steps[-1]['slots'] if cell['active']} if steps else set()
    released = [cell['address'] for cell in cells if cell['address'] in previously_active and not cell['active']]
    steps.append({'function': function, 'pc': pc, 'executed': executed,
                  'registers': copy.deepcopy(registers), 'slots': cells,
                  'message': message, 'changedRegisters': list(changed_regs),
                  'changedSlots': list(changed_slots), 'releasedSlots': released})


def read(operand):
    if operand in registers or operand in aliases:
        return registers[aliases.get(operand, operand)]
    match = re.fullmatch(r'dword ptr \[rbp - (\d+)\]', operand)
    if match:
        return slots[registers['rbp'] - int(match[1])]['value']
    return int(operand)


snapshot('Вход в main. Адрес возврата уже лежит в стеке. Адреса условные; значения остальных регистров пока неизвестны.')
while function != 'done':
    instruction = functions[function][pc]
    executed = {'function': function, 'pc': pc, 'instruction': instruction}
    op, _, operands = instruction.partition(' ')
    args = operands.split(', ')
    changed_regs, changed_slots = [], []
    pc += 1
    if op == 'push':
        assert args == ['rbp']
        registers['rsp'] -= 8
        address = registers['rsp']
        slots[address] = {'address': address, 'size': 8, 'value': registers['rbp'],
                          'label': 'Сохранённый RBP', 'frame': function}
        changed_regs = ['rsp']; changed_slots = [address]
        message = 'push rbp: RSP уменьшился на 8; прежний RBP сохранён в стеке.'
    elif op == 'mov':
        dest, source = args
        value = read(source)
        if dest.startswith('dword'):
            offset = int(re.fullmatch(r'dword ptr \[rbp - (\d+)\]', dest)[1])
            address = registers['rbp'] - offset
            if address not in slots:
                assert function == '_Z3addii' and registers['rsp'] - 128 <= address < registers['rsp']
                slots[address] = {'address': address, 'size': 4, 'value': None,
                                  'label': labels[function][offset], 'frame': function}
            slots[address]['value'] = value
            changed_slots = [address]
            message = f'В слот «{slots[address]["label"]}» записано {value}: 4 байта для int.'
            if function == '_Z3addii':
                message += ' Он в red zone — области до 128 байт ниже RSP. В этом листинге add не сдвигает RSP для локальных данных.'
        else:
            reg = aliases.get(dest, dest)
            registers[reg] = value & 0xffffffff if dest in aliases else value
            changed_regs = [reg]
            message = f'{dest.upper()} получает {value if reg not in ("rsp", "rbp") else hex(value)}.'
            if dest in aliases:
                message += f' Запись в {dest.upper()} обнуляет старшие 32 бита {reg.upper()}.'
            if dest == 'rbp':
                message += ' RBP — опорный адрес текущего кадра.'
                if function == '_Z3addii':
                    red_zone_base = value
    elif op in ('sub', 'add'):
        dest, source = args
        reg = aliases.get(dest, dest)
        amount = read(source)
        previous = registers[reg]
        registers[reg] += amount if op == 'add' else -amount
        if dest in aliases:
            registers[reg] &= 0xffffffff
        changed_regs = [reg]
        if reg == 'rsp' and op == 'sub':
            for offset, label in labels[function].items():
                address = registers['rbp'] - offset
                slots[address] = {'address': address, 'size': 4, 'value': None,
                                  'label': label, 'frame': function}
                changed_slots.append(address)
            message = f'RSP уменьшился на {amount}: main резервирует место для a, b, answer и выравнивания. Значения пока не заданы.'
        else:
            message = f'{dest.upper()} = {previous} + {amount} = {registers[reg]}. Здесь EDX хранит a, EAX — сначала b, затем сумму.'
    elif op == 'call':
        assert registers['rsp'] % 16 == 0, 'System V call alignment'
        registers['rsp'] -= 8
        address = registers['rsp']
        slots[address] = {'address': address, 'size': 8, 'value': f'main:{pc}',
                          'label': 'Возврат к записи answer', 'frame': args[0]}
        function = args[0]; pc = 0
        changed_regs = ['rsp']; changed_slots = [address]
        message = 'call сохраняет адрес следующей инструкции и передаёт управление add. Аргументы уже в EDI = 40 и ESI = 2.'
    elif op in ('pop', 'leave'):
        if op == 'leave':
            registers['rsp'] = registers['rbp']
            # Two teaching steps show the effects of one machine instruction.
            snapshot('leave, 1/2: RSP получает RBP. Локальная область main снята со стека; байты не обнуляются. Сохранённый RBP пока ещё в стеке.',
                     ['rsp'], (), {**executed, 'part': 1, 'parts': 2, 'effect': 'mov rsp, rbp'})
            executed = {**executed, 'part': 2, 'parts': 2, 'effect': 'pop rbp'}
        else:
            assert args == ['rbp']
        registers['rbp'] = slots[registers['rsp']]['value']
        registers['rsp'] += 8
        changed_regs = ['rbp', 'rsp']
        message = ('leave, 2/2: восстановлен RBP вызывающего кода; RSP увеличился на 8. На вершине остался адрес возврата из main.'
                   if op == 'leave' else 'pop rbp восстанавливает RBP main и увеличивает RSP на 8. Локальные слоты add больше не используются.')
    elif op == 'ret':
        target = slots[registers['rsp']]['value']
        registers['rsp'] += 8
        changed_regs = ['rsp']
        if target == 'вызывающий код':
            function = 'done'; pc = 0
            message = 'main вернула 42 через EAX. Кадр main снят; программа завершится с кодом 42.'
        else:
            function, index = target.split(':'); pc = int(index)
            message = 'ret забирает адрес возврата из стека. Следующая инструкция main запишет EAX = 42 в answer.'
    else:
        raise ValueError(instruction)
    snapshot(message, changed_regs, changed_slots, executed)

assert registers == {'rsp': 0x1010, 'rbp': 0x1080, 'rax': 42, 'rdi': 40, 'rsi': 2, 'rdx': 40}
assert slots[0xff4]['value'] == 42
assert len(steps) == 27
payload = {'source': SOURCE.read_text(), 'assembly': assembly, 'functions': functions, 'steps': steps,
           'origin': 'Листинг Compiler Explorer, предоставленный для лекции: x86-64, System V ABI.'}
OUT.write_text('window.STACK_TRACE = ' + json.dumps(payload, ensure_ascii=False, indent=2) + ';\n')
print(f'Generated {len(steps)} states from {ASSEMBLY.relative_to(ROOT)}')
