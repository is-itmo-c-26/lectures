'use strict';
(() => {
    const trace = window.STACK_TRACE;
    const get = id => document.getElementById(id);
    const names = { main: 'main', _Z3addii: 'add', done: 'вызывающий код' };
    const roles = { rsp: 'Вершина стека', rbp: 'Основание текущего кадра', rdi: 'Первый аргумент: EDI', rsi: 'Второй аргумент: ESI', rax: 'Результат: EAX' };
    const hex = value => `0x${value.toString(16).padStart(4, '0')}`;
    let position = 0;
    let showSource = false;
    get('position').max = trace.steps.length - 1;
    get('source').textContent = trace.source;
    // The exact generated assembly is also available offline, without a server.
    get('assembly-link').href = URL.createObjectURL(new Blob([trace.assembly], { type: 'text/plain' }));
    document.querySelector('.eyebrow').title = `${trace.compiler}\n${trace.flags.join(' ')}`;
    get('assembly-link').download = 'function-call.s';
    function render() {
        const state = trace.steps[position];
        const executed = state.executed;
        // On call/ret the code pane immediately follows control into its destination.
        const visibleFunction = state.function === 'done' ? 'main' : state.function;
        get('counter').textContent = `${position} / ${trace.steps.length - 1}`;
        get('position').value = position;
        get('previous').disabled = position === 0;
        get('next').disabled = position === trace.steps.length - 1;
        get('reset').disabled = position === 0;
        get('instruction').textContent = executed ? `Выполнено: ${names[executed.function]} · ${executed.instruction}` : 'До первой инструкции main';
        get('explanation').textContent = state.message;
        get('code-title').textContent = showSource ? 'Исходный C++' : `Инструкции ${names[visibleFunction]}`;
        get('assembly').replaceChildren();
        trace.functions[visibleFunction].forEach((instruction, index) => {
            const line = document.createElement('div');
            line.className = 'code-line';
            if (executed?.function === visibleFunction && executed.pc === index) line.classList.add('executed');
            if (state.function === visibleFunction && state.pc === index) line.classList.add('upcoming');
            const number = document.createElement('span');
            number.className = 'line-number'; number.textContent = index + 1;
            line.append(number, document.createTextNode(instruction));
            get('assembly').append(line);
        });
        get('registers').replaceChildren();
        for (const key of ['rsp', 'rbp', 'rdi', 'rsi', 'rax']) {
            const row = document.createElement('div'); row.className = 'register';
            if (state.changedRegisters.includes(key)) row.classList.add('changed');
            const label = document.createElement('dt'); label.textContent = key.toUpperCase();
            const value = document.createElement('dd');
            value.textContent = state.registers[key] === null ? '?' : ['rsp', 'rbp'].includes(key) ? hex(state.registers[key]) : state.registers[key];
            const role = document.createElement('small'); role.textContent = roles[key];
            row.append(label, value, role); get('registers').append(row);
        }
        get('control').textContent = state.function === 'done' ? 'Управление вернулось вызывающему коду' : `Следующая: ${names[state.function]} · ${state.pc + 1}`;
        get('stack').replaceChildren();
        [...state.slots].sort((a, b) => b.address - a.address).forEach(slot => {
            const row = document.createElement('tr');
            if (slot.address < state.registers.rsp) row.classList.add('inactive');
            else if (state.changedSlots.includes(slot.address)) row.classList.add('changed');
            const address = document.createElement('td'); address.textContent = hex(slot.address);
            const pointers = ['rsp', 'rbp'].filter(key => state.registers[key] === slot.address);
            if (pointers.length) { const marker = document.createElement('div'); marker.className = 'pointer'; marker.textContent = pointers.map(key => key.toUpperCase()).join(' · '); address.append(marker); }
            const label = document.createElement('td'); label.textContent = `${names[slot.frame] || 'внешний код'} · ${slot.label}`;
            const size = document.createElement('span'); size.className = 'slot-size'; size.textContent = ` (${slot.size} Б)`; label.append(size);
            const value = document.createElement('td'); value.textContent = slot.value === null ? '?' : typeof slot.value === 'number' && slot.size === 8 ? hex(slot.value) : slot.value;
            row.append(address, label, value); get('stack').append(row);
        });
    }
    function go(value) { position = Math.max(0, Math.min(trace.steps.length - 1, value)); render(); }
    get('next').addEventListener('click', () => go(position + 1));
    get('previous').addEventListener('click', () => go(position - 1));
    get('reset').addEventListener('click', () => go(0));
    get('position').addEventListener('input', event => go(Number(event.target.value)));
    document.querySelectorAll('[data-step]').forEach(button => button.addEventListener('click', () => go(Number(button.dataset.step))));
    get('code-toggle').addEventListener('click', () => {
        showSource = !showSource;
        get('source').hidden = !showSource; get('assembly').hidden = showSource;
        get('code-toggle').textContent = showSource ? 'Показать ассемблер' : 'Показать C++';
        get('code-toggle').setAttribute('aria-pressed', String(showSource)); render();
    });
    document.addEventListener('keydown', event => {
        if (event.target.matches('input')) return;
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            event.preventDefault(); go(position + (event.key === 'ArrowRight' ? 1 : -1));
        }
    });
    render();
})();
