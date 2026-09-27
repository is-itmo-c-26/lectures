#!/usr/bin/env python3
"""Generate the teaching trace from Clang's assembly. Run from any directory."""
import copy
import json
import os
from pathlib import Path
import re
import subprocess

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / 'examples/05-memory/function-call.cpp'
ASSEMBLY = SOURCE.with_suffix('.s')
OUT = ROOT / 'assets/05-memory/stack-demo/trace.js'
FLAGS = ['--target=x86_64-unknown-linux-gnu', '-std=c++23', '-Wall', '-Wextra',
         '-pedantic', '-O0', '-fno-omit-frame-pointer', '-fno-stack-protector',
         '-fno-asynchronous-unwind-tables', '-mno-red-zone', '-masm=intel']
compiler = os.environ.get('CXX', 'clang++')
subprocess.run([compiler, *FLAGS, '-S', str(SOURCE), '-o', str(ASSEMBLY)], check=True)
assembly = ASSEMBLY.read_text()
functions = {}
current = None
for line in assembly.splitlines():
    line = line.split('#', 1)[0].strip()
    if line in ('main:', '_Z3addii:'):
        current = line[:-1]
        functions[current] = []
    elif line.startswith('.Lfunc_end'):
        current = None
    elif current and line and not line.startswith('.'):
        functions[current].append(re.sub(r'\s+', ' ', line))
# Names below describe this exact unoptimized layout, not a universal ABI rule.
expected_main = ['push rbp', 'mov rbp, rsp', 'sub rsp, 16',
    'mov dword ptr [rbp - 4], 0', 'mov dword ptr [rbp - 8], 40',
    'mov dword ptr [rbp - 12], 2', 'mov edi, dword ptr [rbp - 8]',
    'mov esi, dword ptr [rbp - 12]', 'call _Z3addii',
    'mov dword ptr [rbp - 16], eax', 'mov eax, dword ptr [rbp - 16]',
    'add rsp, 16', 'pop rbp', 'ret']
expected_add = ['push rbp', 'mov rbp, rsp', 'sub rsp, 12',
    'mov dword ptr [rbp - 4], edi', 'mov dword ptr [rbp - 8], esi',
    'mov eax, dword ptr [rbp - 4]', 'add eax, dword ptr [rbp - 8]',
    'mov dword ptr [rbp - 12], eax', 'mov eax, dword ptr [rbp - 12]',
    'add rsp, 12', 'pop rbp', 'ret']
assert functions == {'_Z3addii': expected_add, 'main': expected_main}, \
    'Compiler layout changed: review the trace labels before regenerating.'
registers = {'rsp': 0x1008, 'rbp': 0x1080, 'rax': None, 'rdi': None, 'rsi': None}
aliases = {'eax': 'rax', 'edi': 'rdi', 'esi': 'rsi'}
slots = {0x1008: {'address': 0x1008, 'size': 8, 'value': 'вызывающий код',
                   'label': 'Адрес возврата из main', 'frame': 'caller'}}
labels = {'main': {4: 'Служебный слот Clang', 8: 'a', 12: 'b', 16: 'answer'},
          '_Z3addii': {4: 'a (копия аргумента)', 8: 'b (копия аргумента)', 12: 'result'}}
steps = []
function = 'main'
pc = 0

def snapshot(message, changed_regs=(), changed_slots=(), executed=None):
    steps.append({'function': function, 'pc': pc, 'executed': executed,
                  'registers': copy.deepcopy(registers),
                  'slots': copy.deepcopy(list(slots.values())),
                  'message': message, 'changedRegisters': list(changed_regs),
                  'changedSlots': list(changed_slots)})

def read(operand):
    if operand in registers or operand in aliases:
        return registers[aliases.get(operand, operand)]
    match = re.fullmatch(r'dword ptr \[rbp - (\d+)\]', operand)
    if match:
        return slots[registers['rbp'] - int(match[1])]['value']
    return int(operand)

snapshot('Вход в main. Вызывающий код уже положил адрес возврата в стек. Адреса условные; значения остальных регистров пока неизвестны.')
while function != 'done':
    instruction = functions[function][pc]
    executed = {'function': function, 'pc': pc, 'instruction': instruction}
    op, _, operands = instruction.partition(' ')
    args = operands.split(', ')
    changed_regs, changed_slots = [], []
    pc += 1
    if op == 'push':
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
            offset = int(re.search(r'- (\d+)', dest)[1])
            address = registers['rbp'] - offset
            slots[address]['value'] = value
            changed_slots = [address]
            message = f'В слот «{slots[address]["label"]}» записано {value}. Это 4 байта, потому что здесь хранится int.'
        else:
            reg = aliases.get(dest, dest)
            registers[reg] = value
            changed_regs = [reg]
            message = f'{dest.upper()} получает {value if reg not in ("rsp", "rbp") else hex(value)}.'
            if dest in aliases:
                message += f' Запись в {dest.upper()} обнуляет старшие 32 бита {reg.upper()}.'
            if dest == 'rbp': message += ' Теперь RBP указывает на основание текущего кадра.'
    elif op in ('sub', 'add'):
        dest, source = args
        reg = aliases.get(dest, dest)
        amount = read(source)
        registers[reg] += amount if op == 'add' else -amount
        changed_regs = [reg]
        if reg == 'rsp' and op == 'sub':
            for offset, label in labels[function].items():
                address = registers['rbp'] - offset
                slots[address] = {'address': address, 'size': 4, 'value': None,
                                  'label': label, 'frame': function}
                changed_slots.append(address)
            message = f'RSP уменьшился на {amount}: зарезервирована память кадра. Резервирование не задаёт значения переменным.'
        elif reg == 'rsp':
            message = f'RSP увеличился на {amount}: локальная область кадра освобождена. Байты не обязаны стираться; серые ячейки уже вне активного стека.'
        else:
            message = f'EAX = 40 + 2 = {registers[reg]}. Результат вычисления сейчас находится в регистре.'
    elif op == 'call':
        assert registers['rsp'] % 16 == 0, 'System V call alignment'
        registers['rsp'] -= 8
        address = registers['rsp']
        slots[address] = {'address': address, 'size': 8, 'value': f'main:{pc}',
                          'label': 'Возврат к записи answer', 'frame': 'main'}
        function = args[0]; pc = 0
        changed_regs = ['rsp']; changed_slots = [address]
        message = 'call сохраняет адрес следующей инструкции и передаёт управление add. Аргументы уже в EDI = 40 и ESI = 2.'
    elif op == 'pop':
        registers['rbp'] = slots[registers['rsp']]['value']
        registers['rsp'] += 8
        changed_regs = ['rbp', 'rsp']
        message = 'pop rbp восстанавливает RBP вызывающей функции и увеличивает RSP на 8.'
    elif op == 'ret':
        target = slots[registers['rsp']]['value']
        registers['rsp'] += 8
        changed_regs = ['rsp']
        if target == 'вызывающий код':
            function = 'done'; pc = 0
            message = 'main вернула 42 вызывающему коду. RSP и RBP восстановлены; программа завершится с кодом 42.'
        else:
            function, index = target.split(':'); pc = int(index)
            message = 'ret забирает адрес возврата из стека. Следующая инструкция main запишет EAX = 42 в answer.'
    else:
        raise ValueError(instruction)
    snapshot(message, changed_regs, changed_slots, executed)
assert registers == {'rsp': 0x1010, 'rbp': 0x1080, 'rax': 42, 'rdi': 40, 'rsi': 2}
assert slots[0xff0]['value'] == 42
assert len(steps) == 27
payload = {'source': SOURCE.read_text(), 'assembly': assembly, 'functions': functions, 'steps': steps,
           'compiler': subprocess.check_output([compiler, '--version'], text=True).splitlines()[0],
           'flags': FLAGS}
OUT.write_text('window.STACK_TRACE = ' + json.dumps(payload, ensure_ascii=False, indent=2) + ';\n')
print(f'Generated {len(steps)} states from {ASSEMBLY.relative_to(ROOT)}')
