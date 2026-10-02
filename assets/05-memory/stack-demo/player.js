'use strict';
(() => {
    const trace = window.STACK_TRACE;
    const get = id => document.getElementById(id);
    const ns = 'http://www.w3.org/2000/svg';
    const names = { main: 'main', _Z3addii: 'add', done: 'вызывающий код' };
    const hex = value => `0x${value.toString(16)}`;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const allSlots = [...trace.steps.at(-1).slots].sort((a, b) => a.address - b.address);
    const width = 92, origin = 40, step = 94;
    const registerTop = 26, registerHeight = 87, registerBottom = registerTop + registerHeight;
    const cellTop = 197;
    const slotX = address => {
        const index = allSlots.findIndex(slot => slot.address === address);
        if (index >= 0) return origin + index * step + width / 2;
        return address > allSlots.at(-1).address ? 1176 : 20;
    };
    const centers = { rdi: 120, rsi: 310, rax: 500, rsp: 720, rbp: 940 };
    const registerNodes = {}, cellNodes = {};
    let position = 0, timer = null, animation = null;
    let endpoints = { rsp: slotX(trace.steps[0].registers.rsp) - 18, rbp: slotX(trace.steps[0].registers.rbp) };
    function node(tag, attrs = {}, parent, text) {
        const el = document.createElementNS(ns, tag);
        for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value);
        if (text !== undefined) el.textContent = text;
        parent?.append(el); return el;
    }
    for (const [key, x] of Object.entries(centers)) {
        const group = node('g', { class: 'register', transform: `translate(${x - 62} ${registerTop})` }, get('registers'));
        node('rect', { width: 124, height: registerHeight, rx: 11 }, group);
        node('text', { x: 62, y: 25, 'text-anchor': 'middle', class: 'name' }, group, {rdi:'EDI',rsi:'ESI',rax:'EAX',rsp:'RSP',rbp:'RBP'}[key]);
        const value = node('text', { x: 62, y: 51, 'text-anchor': 'middle', class: 'value' }, group);
        node('text', { x: 62, y: 73, 'text-anchor': 'middle', class: 'role' }, group, {rdi:'аргумент a',rsi:'аргумент b',rax:'результат',rsp:'вершина стека',rbp:'основание кадра'}[key]);
        registerNodes[key] = {group, value};
    }
    allSlots.forEach(slot => {
        const x = slotX(slot.address) - width / 2;
        const group = node('g', { class: 'cell absent', transform: `translate(${x} ${cellTop})` }, get('cells'));
        node('rect', { width, height: 82, rx: 10 }, group);
        const label = slot.label === 'Сохранённый RBP' ? ['saved RBP'] : slot.label.startsWith('Адрес возврата') || slot.label.startsWith('Возврат') ? ['return', 'address'] : slot.label.startsWith('Служебный') ? ['служебный', 'слот'] : [slot.label.split(' ')[0]];
        label.forEach((line, i) => node('text', {x: width/2, y: 19 + i*14, 'text-anchor':'middle',class:'label'},group,line));
        const value = node('text', { x: width/2, y: 58, 'text-anchor':'middle', class:'value' }, group);
        node('text', {x: width/2,y:74,'text-anchor':'middle',class:'bytes'},group,`${slot.size} байт · ${names[slot.frame] || 'caller'}`);
        node('text', {x:width/2,y:100,'text-anchor':'middle',class:'address'},group,hex(slot.address));
        cellNodes[slot.address] = {group, value};
    });
    const outside = node('g', { class: 'outside', transform: `translate(1098 ${cellTop})` }, get('cells'));
    node('rect', { width: 156, height: 82, rx: 10 }, outside);
    node('text', { x: 78, y: 21, 'text-anchor': 'middle' }, outside, 'Стек вызывающего кода');
    node('text', { x: 78, y: 40, 'text-anchor': 'middle' }, outside, 'за пределами фрагмента');
    const outsideAddress = node('text', { x: 78, y: 65, 'text-anchor': 'middle', class: 'address' }, outside);
    get('position').max = trace.steps.length - 1;
    get('source').textContent = trace.source;
    get('assembly-link').href = URL.createObjectURL(new Blob([trace.assembly], {type:'text/plain'}));
    get('assembly-link').download = 'function-call.s';
    function pointerPath(key, end) {
        const x = centers[key], mid = key === 'rsp' ? 139 : 163;
        const direction = Math.sign(end - x), radius = Math.min(6, Math.abs(end - x) / 2);
        return `M ${x} ${registerBottom} L ${x} ${mid - radius} Q ${x} ${mid} ${x + direction * radius} ${mid} L ${end - direction * radius} ${mid} Q ${end} ${mid} ${end} ${mid + radius} L ${end} ${cellTop}`;
    }
    function flow(state, previous) {
        const executed = state.executed;
        if (!executed || !previous) return null;
        const instruction = executed.instruction;
        const memory = instruction.match(/\[rbp - (\d+)\]/);
        const memoryPoint = memory ? [slotX(previous.registers.rbp - Number(memory[1])) + 18, cellTop] : null;
        const regPoint = key => [centers[{edi:'rdi',esi:'rsi',eax:'rax'}[key] || key] + 18, registerBottom];
        if (instruction.startsWith('push')) return [regPoint('rbp'), [slotX(state.registers.rsp) + 18,cellTop]];
        if (instruction.startsWith('pop')) return [[slotX(previous.registers.rsp) + 18,cellTop],regPoint('rbp')];
        if (instruction.startsWith('call')) return [[550,5],[slotX(state.registers.rsp) + 18,cellTop]];
        if (instruction === 'ret') return [[slotX(previous.registers.rsp) + 18,cellTop],[550,5]];
        const parts = instruction.replace(/^\w+ /,'').split(', ');
        if (memoryPoint && parts[0].startsWith('dword') && /^(eax|edi|esi)$/.test(parts[1])) return [regPoint(parts[1]),memoryPoint];
        if (memoryPoint && /^(eax|edi|esi)$/.test(parts[0])) return [memoryPoint,regPoint(parts[0])];
        if (instruction === 'mov rbp, rsp') return [regPoint('rsp'),regPoint('rbp')];
        return null;
    }
    function draw(animate = true) {
        cancelAnimationFrame(animation);
        const state = trace.steps[position];
        get('counter').textContent = `${position} / ${trace.steps.length - 1}`;
        get('position').value = position;
        get('previous').disabled = position === 0;
        get('next').disabled = position === trace.steps.length - 1;
        get('instruction').textContent = state.executed ? `${names[state.executed.function]}: ${state.executed.instruction}` : 'Вход в main';
        get('next-instruction').textContent = state.function === 'done' ? 'Выполнение завершено' : `Далее: ${trace.functions[state.function][state.pc]}`;
        get('explanation').textContent = state.message;
        get('scene-description').textContent = state.message;
        for (const [key, refs] of Object.entries(registerNodes)) {
            refs.group.setAttribute('class', `register${state.changedRegisters.includes(key) ? ' changed' : ''}`);
            const value = state.registers[key];
            refs.value.textContent = value === null ? '?' : ['rsp','rbp'].includes(key) ? hex(value) : value;
        }
        for (const slot of allSlots) {
            const current = state.slots.find(item => item.address === slot.address);
            const refs = cellNodes[slot.address];
            const inactive = current && slot.address < state.registers.rsp;
            refs.group.setAttribute('class', `cell${slot.size === 8 ? ' saved' : ''}${!current ? ' absent' : inactive ? ' inactive' : state.changedSlots.includes(slot.address) ? ' changed' : ''}`);
            refs.value.textContent = !current || current.value === null ? '??' : typeof current.value === 'string' ? (current.value.startsWith('main:') ? 'main:10' : 'caller') : slot.size === 8 ? hex(current.value) : current.value;
        }
        const saved = state.slots.find(slot => slot.address === state.registers.rbp && slot.label === 'Сохранённый RBP' && slot.address >= state.registers.rsp);
        const outsideAddresses = [state.registers.rsp, state.registers.rbp, saved?.value]
            .filter(address => address !== undefined && !allSlots.some(slot => slot.address === address));
        outsideAddress.textContent = [...new Set(outsideAddresses)].map(hex).join(' · ');
        get('saved-arrow').setAttribute('d', saved ? `M ${slotX(saved.address)} 279 L ${slotX(saved.address)} 307 L ${slotX(saved.value)} 307 L ${slotX(saved.value)} 279` : '');
        get('frame-caption').textContent = state.function === 'done' ? 'RSP и RBP восстановлены. EAX = 42.' : `Выполняется ${names[state.function]}${saved ? ' · нижняя стрелка: сохранённый RBP вызывающей функции' : ''}`;
        const start = {...endpoints}, target = {rsp:slotX(state.registers.rsp) - 18,rbp:slotX(state.registers.rbp)};
        const transfer = animate && !reduced ? flow(state, trace.steps[position - 1]) : null;
        // Leave and enter register cards vertically, including register-to-register moves.
        const controls = transfer?.map(([x, y]) => [x, y === registerBottom ? 155 : y === cellTop ? 155 : 15]);
        get('transfer').setAttribute('d', transfer ? `M ${transfer[0].join(' ')} C ${controls[0].join(' ')} ${controls[1].join(' ')} ${transfer[1].join(' ')}` : '');
        const dot = get('transfer-dot'); dot.setAttribute('visibility', transfer ? 'visible' : 'hidden');
        const begin = performance.now(), duration = animate && !reduced ? 700 : 0;
        function tick(now) {
            const t = duration ? Math.min(1,(now-begin)/duration) : 1;
            const eased = 1 - (1-t)**3;
            for (const key of ['rsp','rbp']) {
                endpoints[key] = start[key] + (target[key]-start[key])*eased;
                get(`${key}-arrow`).setAttribute('d',pointerPath(key,endpoints[key]));
            }
            if (transfer) {
                for (const [axis, attribute] of ['cx', 'cy'].entries()) {
                    const value = (1-t)**3 * transfer[0][axis] + 3*(1-t)**2*t * controls[0][axis]
                        + 3*(1-t)*t*t * controls[1][axis] + t**3 * transfer[1][axis];
                    dot.setAttribute(attribute, value);
                }
            }
            if (t < 1) animation = requestAnimationFrame(tick);
            else dot.setAttribute('visibility','hidden');
        }
        tick(begin);
    }
    function pause() { clearInterval(timer); timer = null; get('play').textContent='▶ Воспроизвести'; get('play').setAttribute('aria-pressed','false'); }
    function go(value, auto = false) {
        if (!auto) pause();
        const old = position;
        position=Math.max(0,Math.min(trace.steps.length-1,value));
        draw(position === old + 1);
        if(position===trace.steps.length-1) pause();
    }
    get('next').addEventListener('click',()=>go(position+1));
    get('previous').addEventListener('click',()=>go(position-1));
    get('reset').addEventListener('click',()=>go(0));
    get('position').addEventListener('input',event=>go(Number(event.target.value)));
    get('play').addEventListener('click',()=>{
        if(timer) return pause();
        if(position===trace.steps.length-1) go(0);
        get('play').textContent='Ⅱ Пауза';get('play').setAttribute('aria-pressed','true');
        timer=setInterval(()=>go(position+1,true),2800);
    });
    get('source-toggle').addEventListener('click',()=>{
        get('source').hidden=!get('source').hidden;
        get('source-toggle').setAttribute('aria-expanded',String(!get('source').hidden));
    });
    document.addEventListener('keydown',event=>{
        if(event.target.matches('input'))return;
        if(['ArrowRight','ArrowLeft'].includes(event.key)) {event.preventDefault();go(position+(event.key==='ArrowRight'?1:-1));}
    });
    document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();});
    window.addEventListener('pagehide',pause);
    draw(false);
})();
