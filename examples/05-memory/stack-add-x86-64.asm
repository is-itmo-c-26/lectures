Add(int, int):                      ; начало функции Add
    push    rbp                     ; сохранить rbp вызывающего на стеке
    mov     rbp, rsp                ; rbp = вершина стека: начало кадра Add
    mov     dword ptr [rbp - 4], edi  ; a: первый аргумент из edi — в кадр
    mov     dword ptr [rbp - 8], esi  ; b: второй аргумент из esi — в кадр
    mov     eax, dword ptr [rbp - 4]  ; eax = a
    add     eax, dword ptr [rbp - 8]  ; eax = a + b — результат функции
    pop     rbp                     ; восстановить rbp вызывающего
    ret                             ; снять адрес возврата и перейти по нему
main:                               ; начало функции main
    push    rbp                     ; сохранить rbp вызывающего на стеке
    mov     rbp, rsp                ; начало кадра main
    sub     rsp, 16                 ; 16 байт под локальные переменные
    mov     dword ptr [rbp - 4], 0  ; служебная ячейка под код возврата main
    mov     edi, 40                 ; первый аргумент Add: a = 40
    mov     esi, 2                  ; второй аргумент Add: b = 2
    call    Add(int, int)           ; адрес возврата — на стек, переход в Add
    mov     dword ptr [rbp - 8], eax  ; result = eax, то есть 42
    mov     eax, dword ptr [rbp - 8]  ; eax = result — значение для return
    add     rsp, 16                 ; освободить место под локальные
    pop     rbp                     ; восстановить rbp вызывающего
    ret                             ; вернуться из main
