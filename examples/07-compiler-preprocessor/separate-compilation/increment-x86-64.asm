_Z9IncrementRi:                     ; Increment(int&)
    push    rbp
    mov     rbp, rsp
    mov     qword ptr [rbp - 8], rdi  ; rdi — адрес value: ссылка пришла как адрес
    mov     rax, qword ptr [rbp - 8]
    mov     ecx, dword ptr [rax]      ; прочитать int по этому адресу
    add     ecx, 1                    ; ++value
    mov     dword ptr [rax], ecx      ; записать обратно
    pop     rbp
    ret
