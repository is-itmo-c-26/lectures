_Z3addii: # add(int, int)
    push rbp                       # сохранить RBP вызывающего
    mov rbp, rsp                   # задать опорный адрес кадра
    sub rsp, 12                    # выделить 12 байт под a, b, result
    mov dword ptr [rbp - 4], edi   # сохранить первый аргумент a
    mov dword ptr [rbp - 8], esi   # сохранить второй аргумент b
    mov eax, dword ptr [rbp - 4]   # EAX = a
    add eax, dword ptr [rbp - 8]   # EAX = a + b
    mov dword ptr [rbp - 12], eax  # записать result
    mov eax, dword ptr [rbp - 12]  # вернуть result через EAX
    add rsp, 12                    # освободить локальную область
    pop rbp                        # восстановить RBP вызывающего
    ret                            # перейти по адресу возврата
