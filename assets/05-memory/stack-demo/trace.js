window.STACK_TRACE = {
  "source": "int add(int a, int b) {\n    int result = a + b;\n    return result;\n}\n\nint main() {\n    int a = 40;\n    int b = 2;\n    int answer = add(a, b);\n    return answer;\n}\n",
  "assembly": "\"add(int, int)\":\n        push    rbp\n        mov     rbp, rsp\n        mov     DWORD PTR [rbp-20], edi\n        mov     DWORD PTR [rbp-24], esi\n        mov     edx, DWORD PTR [rbp-20]\n        mov     eax, DWORD PTR [rbp-24]\n        add     eax, edx\n        mov     DWORD PTR [rbp-4], eax\n        mov     eax, DWORD PTR [rbp-4]\n        pop     rbp\n        ret\n\"main\":\n        push    rbp\n        mov     rbp, rsp\n        sub     rsp, 16\n        mov     DWORD PTR [rbp-4], 40\n        mov     DWORD PTR [rbp-8], 2\n        mov     edx, DWORD PTR [rbp-8]\n        mov     eax, DWORD PTR [rbp-4]\n        mov     esi, edx\n        mov     edi, eax\n        call    \"add(int, int)\"\n        mov     DWORD PTR [rbp-12], eax\n        mov     eax, DWORD PTR [rbp-12]\n        leave\n        ret\n",
  "functions": {
    "_Z3addii": [
      "push rbp",
      "mov rbp, rsp",
      "mov dword ptr [rbp - 20], edi",
      "mov dword ptr [rbp - 24], esi",
      "mov edx, dword ptr [rbp - 20]",
      "mov eax, dword ptr [rbp - 24]",
      "add eax, edx",
      "mov dword ptr [rbp - 4], eax",
      "mov eax, dword ptr [rbp - 4]",
      "pop rbp",
      "ret"
    ],
    "main": [
      "push rbp",
      "mov rbp, rsp",
      "sub rsp, 16",
      "mov dword ptr [rbp - 4], 40",
      "mov dword ptr [rbp - 8], 2",
      "mov edx, dword ptr [rbp - 8]",
      "mov eax, dword ptr [rbp - 4]",
      "mov esi, edx",
      "mov edi, eax",
      "call _Z3addii",
      "mov dword ptr [rbp - 12], eax",
      "mov eax, dword ptr [rbp - 12]",
      "leave",
      "ret"
    ]
  },
  "steps": [
    {
      "function": "main",
      "pc": 0,
      "executed": null,
      "registers": {
        "rsp": 4104,
        "rbp": 4224,
        "rax": null,
        "rdi": null,
        "rsi": null,
        "rdx": null
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "main",
          "active": true,
          "redZone": false
        }
      ],
      "message": "Вход в main. Адрес возврата уже лежит в стеке. Адреса условные; значения остальных регистров пока неизвестны.",
      "changedRegisters": [],
      "changedSlots": [],
      "releasedSlots": []
    },
    {
      "function": "main",
      "pc": 1,
      "executed": {
        "function": "main",
        "pc": 0,
        "instruction": "push rbp"
      },
      "registers": {
        "rsp": 4096,
        "rbp": 4224,
        "rax": null,
        "rdi": null,
        "rsi": null,
        "rdx": null
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4096,
          "size": 8,
          "value": 4224,
          "label": "Сохранённый RBP",
          "frame": "main",
          "active": true,
          "redZone": false
        }
      ],
      "message": "push rbp: RSP уменьшился на 8; прежний RBP сохранён в стеке.",
      "changedRegisters": [
        "rsp"
      ],
      "changedSlots": [
        4096
      ],
      "releasedSlots": []
    },
    {
      "function": "main",
      "pc": 2,
      "executed": {
        "function": "main",
        "pc": 1,
        "instruction": "mov rbp, rsp"
      },
      "registers": {
        "rsp": 4096,
        "rbp": 4096,
        "rax": null,
        "rdi": null,
        "rsi": null,
        "rdx": null
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4096,
          "size": 8,
          "value": 4224,
          "label": "Сохранённый RBP",
          "frame": "main",
          "active": true,
          "redZone": false
        }
      ],
      "message": "RBP получает 0x1000. RBP — опорный адрес текущего кадра.",
      "changedRegisters": [
        "rbp"
      ],
      "changedSlots": [],
      "releasedSlots": []
    },
    {
      "function": "main",
      "pc": 3,
      "executed": {
        "function": "main",
        "pc": 2,
        "instruction": "sub rsp, 16"
      },
      "registers": {
        "rsp": 4080,
        "rbp": 4096,
        "rax": null,
        "rdi": null,
        "rsi": null,
        "rdx": null
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4096,
          "size": 8,
          "value": 4224,
          "label": "Сохранённый RBP",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4092,
          "size": 4,
          "value": null,
          "label": "a",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4088,
          "size": 4,
          "value": null,
          "label": "b",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4084,
          "size": 4,
          "value": null,
          "label": "answer",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4080,
          "size": 4,
          "value": null,
          "label": "Выравнивание",
          "frame": "main",
          "active": true,
          "redZone": false
        }
      ],
      "message": "RSP уменьшился на 16: main резервирует место для a, b, answer и выравнивания. Значения пока не заданы.",
      "changedRegisters": [
        "rsp"
      ],
      "changedSlots": [
        4092,
        4088,
        4084,
        4080
      ],
      "releasedSlots": []
    },
    {
      "function": "main",
      "pc": 4,
      "executed": {
        "function": "main",
        "pc": 3,
        "instruction": "mov dword ptr [rbp - 4], 40"
      },
      "registers": {
        "rsp": 4080,
        "rbp": 4096,
        "rax": null,
        "rdi": null,
        "rsi": null,
        "rdx": null
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4096,
          "size": 8,
          "value": 4224,
          "label": "Сохранённый RBP",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4092,
          "size": 4,
          "value": 40,
          "label": "a",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4088,
          "size": 4,
          "value": null,
          "label": "b",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4084,
          "size": 4,
          "value": null,
          "label": "answer",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4080,
          "size": 4,
          "value": null,
          "label": "Выравнивание",
          "frame": "main",
          "active": true,
          "redZone": false
        }
      ],
      "message": "В слот «a» записано 40: 4 байта для int.",
      "changedRegisters": [],
      "changedSlots": [
        4092
      ],
      "releasedSlots": []
    },
    {
      "function": "main",
      "pc": 5,
      "executed": {
        "function": "main",
        "pc": 4,
        "instruction": "mov dword ptr [rbp - 8], 2"
      },
      "registers": {
        "rsp": 4080,
        "rbp": 4096,
        "rax": null,
        "rdi": null,
        "rsi": null,
        "rdx": null
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4096,
          "size": 8,
          "value": 4224,
          "label": "Сохранённый RBP",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4092,
          "size": 4,
          "value": 40,
          "label": "a",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4088,
          "size": 4,
          "value": 2,
          "label": "b",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4084,
          "size": 4,
          "value": null,
          "label": "answer",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4080,
          "size": 4,
          "value": null,
          "label": "Выравнивание",
          "frame": "main",
          "active": true,
          "redZone": false
        }
      ],
      "message": "В слот «b» записано 2: 4 байта для int.",
      "changedRegisters": [],
      "changedSlots": [
        4088
      ],
      "releasedSlots": []
    },
    {
      "function": "main",
      "pc": 6,
      "executed": {
        "function": "main",
        "pc": 5,
        "instruction": "mov edx, dword ptr [rbp - 8]"
      },
      "registers": {
        "rsp": 4080,
        "rbp": 4096,
        "rax": null,
        "rdi": null,
        "rsi": null,
        "rdx": 2
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4096,
          "size": 8,
          "value": 4224,
          "label": "Сохранённый RBP",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4092,
          "size": 4,
          "value": 40,
          "label": "a",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4088,
          "size": 4,
          "value": 2,
          "label": "b",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4084,
          "size": 4,
          "value": null,
          "label": "answer",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4080,
          "size": 4,
          "value": null,
          "label": "Выравнивание",
          "frame": "main",
          "active": true,
          "redZone": false
        }
      ],
      "message": "EDX получает 2. Запись в EDX обнуляет старшие 32 бита RDX.",
      "changedRegisters": [
        "rdx"
      ],
      "changedSlots": [],
      "releasedSlots": []
    },
    {
      "function": "main",
      "pc": 7,
      "executed": {
        "function": "main",
        "pc": 6,
        "instruction": "mov eax, dword ptr [rbp - 4]"
      },
      "registers": {
        "rsp": 4080,
        "rbp": 4096,
        "rax": 40,
        "rdi": null,
        "rsi": null,
        "rdx": 2
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4096,
          "size": 8,
          "value": 4224,
          "label": "Сохранённый RBP",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4092,
          "size": 4,
          "value": 40,
          "label": "a",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4088,
          "size": 4,
          "value": 2,
          "label": "b",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4084,
          "size": 4,
          "value": null,
          "label": "answer",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4080,
          "size": 4,
          "value": null,
          "label": "Выравнивание",
          "frame": "main",
          "active": true,
          "redZone": false
        }
      ],
      "message": "EAX получает 40. Запись в EAX обнуляет старшие 32 бита RAX.",
      "changedRegisters": [
        "rax"
      ],
      "changedSlots": [],
      "releasedSlots": []
    },
    {
      "function": "main",
      "pc": 8,
      "executed": {
        "function": "main",
        "pc": 7,
        "instruction": "mov esi, edx"
      },
      "registers": {
        "rsp": 4080,
        "rbp": 4096,
        "rax": 40,
        "rdi": null,
        "rsi": 2,
        "rdx": 2
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4096,
          "size": 8,
          "value": 4224,
          "label": "Сохранённый RBP",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4092,
          "size": 4,
          "value": 40,
          "label": "a",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4088,
          "size": 4,
          "value": 2,
          "label": "b",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4084,
          "size": 4,
          "value": null,
          "label": "answer",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4080,
          "size": 4,
          "value": null,
          "label": "Выравнивание",
          "frame": "main",
          "active": true,
          "redZone": false
        }
      ],
      "message": "ESI получает 2. Запись в ESI обнуляет старшие 32 бита RSI.",
      "changedRegisters": [
        "rsi"
      ],
      "changedSlots": [],
      "releasedSlots": []
    },
    {
      "function": "main",
      "pc": 9,
      "executed": {
        "function": "main",
        "pc": 8,
        "instruction": "mov edi, eax"
      },
      "registers": {
        "rsp": 4080,
        "rbp": 4096,
        "rax": 40,
        "rdi": 40,
        "rsi": 2,
        "rdx": 2
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4096,
          "size": 8,
          "value": 4224,
          "label": "Сохранённый RBP",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4092,
          "size": 4,
          "value": 40,
          "label": "a",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4088,
          "size": 4,
          "value": 2,
          "label": "b",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4084,
          "size": 4,
          "value": null,
          "label": "answer",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4080,
          "size": 4,
          "value": null,
          "label": "Выравнивание",
          "frame": "main",
          "active": true,
          "redZone": false
        }
      ],
      "message": "EDI получает 40. Запись в EDI обнуляет старшие 32 бита RDI.",
      "changedRegisters": [
        "rdi"
      ],
      "changedSlots": [],
      "releasedSlots": []
    },
    {
      "function": "_Z3addii",
      "pc": 0,
      "executed": {
        "function": "main",
        "pc": 9,
        "instruction": "call _Z3addii"
      },
      "registers": {
        "rsp": 4072,
        "rbp": 4096,
        "rax": 40,
        "rdi": 40,
        "rsi": 2,
        "rdx": 2
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4096,
          "size": 8,
          "value": 4224,
          "label": "Сохранённый RBP",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4092,
          "size": 4,
          "value": 40,
          "label": "a",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4088,
          "size": 4,
          "value": 2,
          "label": "b",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4084,
          "size": 4,
          "value": null,
          "label": "answer",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4080,
          "size": 4,
          "value": null,
          "label": "Выравнивание",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4072,
          "size": 8,
          "value": "main:10",
          "label": "Возврат к записи answer",
          "frame": "_Z3addii",
          "active": true,
          "redZone": false
        }
      ],
      "message": "call сохраняет адрес следующей инструкции и передаёт управление add. Аргументы уже в EDI = 40 и ESI = 2.",
      "changedRegisters": [
        "rsp"
      ],
      "changedSlots": [
        4072
      ],
      "releasedSlots": []
    },
    {
      "function": "_Z3addii",
      "pc": 1,
      "executed": {
        "function": "_Z3addii",
        "pc": 0,
        "instruction": "push rbp"
      },
      "registers": {
        "rsp": 4064,
        "rbp": 4096,
        "rax": 40,
        "rdi": 40,
        "rsi": 2,
        "rdx": 2
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4096,
          "size": 8,
          "value": 4224,
          "label": "Сохранённый RBP",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4092,
          "size": 4,
          "value": 40,
          "label": "a",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4088,
          "size": 4,
          "value": 2,
          "label": "b",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4084,
          "size": 4,
          "value": null,
          "label": "answer",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4080,
          "size": 4,
          "value": null,
          "label": "Выравнивание",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4072,
          "size": 8,
          "value": "main:10",
          "label": "Возврат к записи answer",
          "frame": "_Z3addii",
          "active": true,
          "redZone": false
        },
        {
          "address": 4064,
          "size": 8,
          "value": 4096,
          "label": "Сохранённый RBP",
          "frame": "_Z3addii",
          "active": true,
          "redZone": false
        }
      ],
      "message": "push rbp: RSP уменьшился на 8; прежний RBP сохранён в стеке.",
      "changedRegisters": [
        "rsp"
      ],
      "changedSlots": [
        4064
      ],
      "releasedSlots": []
    },
    {
      "function": "_Z3addii",
      "pc": 2,
      "executed": {
        "function": "_Z3addii",
        "pc": 1,
        "instruction": "mov rbp, rsp"
      },
      "registers": {
        "rsp": 4064,
        "rbp": 4064,
        "rax": 40,
        "rdi": 40,
        "rsi": 2,
        "rdx": 2
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4096,
          "size": 8,
          "value": 4224,
          "label": "Сохранённый RBP",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4092,
          "size": 4,
          "value": 40,
          "label": "a",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4088,
          "size": 4,
          "value": 2,
          "label": "b",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4084,
          "size": 4,
          "value": null,
          "label": "answer",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4080,
          "size": 4,
          "value": null,
          "label": "Выравнивание",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4072,
          "size": 8,
          "value": "main:10",
          "label": "Возврат к записи answer",
          "frame": "_Z3addii",
          "active": true,
          "redZone": false
        },
        {
          "address": 4064,
          "size": 8,
          "value": 4096,
          "label": "Сохранённый RBP",
          "frame": "_Z3addii",
          "active": true,
          "redZone": false
        }
      ],
      "message": "RBP получает 0xfe0. RBP — опорный адрес текущего кадра.",
      "changedRegisters": [
        "rbp"
      ],
      "changedSlots": [],
      "releasedSlots": []
    },
    {
      "function": "_Z3addii",
      "pc": 3,
      "executed": {
        "function": "_Z3addii",
        "pc": 2,
        "instruction": "mov dword ptr [rbp - 20], edi"
      },
      "registers": {
        "rsp": 4064,
        "rbp": 4064,
        "rax": 40,
        "rdi": 40,
        "rsi": 2,
        "rdx": 2
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4096,
          "size": 8,
          "value": 4224,
          "label": "Сохранённый RBP",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4092,
          "size": 4,
          "value": 40,
          "label": "a",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4088,
          "size": 4,
          "value": 2,
          "label": "b",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4084,
          "size": 4,
          "value": null,
          "label": "answer",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4080,
          "size": 4,
          "value": null,
          "label": "Выравнивание",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4072,
          "size": 8,
          "value": "main:10",
          "label": "Возврат к записи answer",
          "frame": "_Z3addii",
          "active": true,
          "redZone": false
        },
        {
          "address": 4064,
          "size": 8,
          "value": 4096,
          "label": "Сохранённый RBP",
          "frame": "_Z3addii",
          "active": true,
          "redZone": false
        },
        {
          "address": 4044,
          "size": 4,
          "value": 40,
          "label": "a (копия аргумента)",
          "frame": "_Z3addii",
          "active": true,
          "redZone": true
        }
      ],
      "message": "В слот «a (копия аргумента)» записано 40: 4 байта для int. Он в red zone — области до 128 байт ниже RSP. В этом листинге add не сдвигает RSP для локальных данных.",
      "changedRegisters": [],
      "changedSlots": [
        4044
      ],
      "releasedSlots": []
    },
    {
      "function": "_Z3addii",
      "pc": 4,
      "executed": {
        "function": "_Z3addii",
        "pc": 3,
        "instruction": "mov dword ptr [rbp - 24], esi"
      },
      "registers": {
        "rsp": 4064,
        "rbp": 4064,
        "rax": 40,
        "rdi": 40,
        "rsi": 2,
        "rdx": 2
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4096,
          "size": 8,
          "value": 4224,
          "label": "Сохранённый RBP",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4092,
          "size": 4,
          "value": 40,
          "label": "a",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4088,
          "size": 4,
          "value": 2,
          "label": "b",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4084,
          "size": 4,
          "value": null,
          "label": "answer",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4080,
          "size": 4,
          "value": null,
          "label": "Выравнивание",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4072,
          "size": 8,
          "value": "main:10",
          "label": "Возврат к записи answer",
          "frame": "_Z3addii",
          "active": true,
          "redZone": false
        },
        {
          "address": 4064,
          "size": 8,
          "value": 4096,
          "label": "Сохранённый RBP",
          "frame": "_Z3addii",
          "active": true,
          "redZone": false
        },
        {
          "address": 4044,
          "size": 4,
          "value": 40,
          "label": "a (копия аргумента)",
          "frame": "_Z3addii",
          "active": true,
          "redZone": true
        },
        {
          "address": 4040,
          "size": 4,
          "value": 2,
          "label": "b (копия аргумента)",
          "frame": "_Z3addii",
          "active": true,
          "redZone": true
        }
      ],
      "message": "В слот «b (копия аргумента)» записано 2: 4 байта для int. Он в red zone — области до 128 байт ниже RSP. В этом листинге add не сдвигает RSP для локальных данных.",
      "changedRegisters": [],
      "changedSlots": [
        4040
      ],
      "releasedSlots": []
    },
    {
      "function": "_Z3addii",
      "pc": 5,
      "executed": {
        "function": "_Z3addii",
        "pc": 4,
        "instruction": "mov edx, dword ptr [rbp - 20]"
      },
      "registers": {
        "rsp": 4064,
        "rbp": 4064,
        "rax": 40,
        "rdi": 40,
        "rsi": 2,
        "rdx": 40
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4096,
          "size": 8,
          "value": 4224,
          "label": "Сохранённый RBP",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4092,
          "size": 4,
          "value": 40,
          "label": "a",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4088,
          "size": 4,
          "value": 2,
          "label": "b",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4084,
          "size": 4,
          "value": null,
          "label": "answer",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4080,
          "size": 4,
          "value": null,
          "label": "Выравнивание",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4072,
          "size": 8,
          "value": "main:10",
          "label": "Возврат к записи answer",
          "frame": "_Z3addii",
          "active": true,
          "redZone": false
        },
        {
          "address": 4064,
          "size": 8,
          "value": 4096,
          "label": "Сохранённый RBP",
          "frame": "_Z3addii",
          "active": true,
          "redZone": false
        },
        {
          "address": 4044,
          "size": 4,
          "value": 40,
          "label": "a (копия аргумента)",
          "frame": "_Z3addii",
          "active": true,
          "redZone": true
        },
        {
          "address": 4040,
          "size": 4,
          "value": 2,
          "label": "b (копия аргумента)",
          "frame": "_Z3addii",
          "active": true,
          "redZone": true
        }
      ],
      "message": "EDX получает 40. Запись в EDX обнуляет старшие 32 бита RDX.",
      "changedRegisters": [
        "rdx"
      ],
      "changedSlots": [],
      "releasedSlots": []
    },
    {
      "function": "_Z3addii",
      "pc": 6,
      "executed": {
        "function": "_Z3addii",
        "pc": 5,
        "instruction": "mov eax, dword ptr [rbp - 24]"
      },
      "registers": {
        "rsp": 4064,
        "rbp": 4064,
        "rax": 2,
        "rdi": 40,
        "rsi": 2,
        "rdx": 40
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4096,
          "size": 8,
          "value": 4224,
          "label": "Сохранённый RBP",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4092,
          "size": 4,
          "value": 40,
          "label": "a",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4088,
          "size": 4,
          "value": 2,
          "label": "b",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4084,
          "size": 4,
          "value": null,
          "label": "answer",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4080,
          "size": 4,
          "value": null,
          "label": "Выравнивание",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4072,
          "size": 8,
          "value": "main:10",
          "label": "Возврат к записи answer",
          "frame": "_Z3addii",
          "active": true,
          "redZone": false
        },
        {
          "address": 4064,
          "size": 8,
          "value": 4096,
          "label": "Сохранённый RBP",
          "frame": "_Z3addii",
          "active": true,
          "redZone": false
        },
        {
          "address": 4044,
          "size": 4,
          "value": 40,
          "label": "a (копия аргумента)",
          "frame": "_Z3addii",
          "active": true,
          "redZone": true
        },
        {
          "address": 4040,
          "size": 4,
          "value": 2,
          "label": "b (копия аргумента)",
          "frame": "_Z3addii",
          "active": true,
          "redZone": true
        }
      ],
      "message": "EAX получает 2. Запись в EAX обнуляет старшие 32 бита RAX.",
      "changedRegisters": [
        "rax"
      ],
      "changedSlots": [],
      "releasedSlots": []
    },
    {
      "function": "_Z3addii",
      "pc": 7,
      "executed": {
        "function": "_Z3addii",
        "pc": 6,
        "instruction": "add eax, edx"
      },
      "registers": {
        "rsp": 4064,
        "rbp": 4064,
        "rax": 42,
        "rdi": 40,
        "rsi": 2,
        "rdx": 40
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4096,
          "size": 8,
          "value": 4224,
          "label": "Сохранённый RBP",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4092,
          "size": 4,
          "value": 40,
          "label": "a",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4088,
          "size": 4,
          "value": 2,
          "label": "b",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4084,
          "size": 4,
          "value": null,
          "label": "answer",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4080,
          "size": 4,
          "value": null,
          "label": "Выравнивание",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4072,
          "size": 8,
          "value": "main:10",
          "label": "Возврат к записи answer",
          "frame": "_Z3addii",
          "active": true,
          "redZone": false
        },
        {
          "address": 4064,
          "size": 8,
          "value": 4096,
          "label": "Сохранённый RBP",
          "frame": "_Z3addii",
          "active": true,
          "redZone": false
        },
        {
          "address": 4044,
          "size": 4,
          "value": 40,
          "label": "a (копия аргумента)",
          "frame": "_Z3addii",
          "active": true,
          "redZone": true
        },
        {
          "address": 4040,
          "size": 4,
          "value": 2,
          "label": "b (копия аргумента)",
          "frame": "_Z3addii",
          "active": true,
          "redZone": true
        }
      ],
      "message": "EAX = 2 + 40 = 42. Здесь EDX хранит a, EAX — сначала b, затем сумму.",
      "changedRegisters": [
        "rax"
      ],
      "changedSlots": [],
      "releasedSlots": []
    },
    {
      "function": "_Z3addii",
      "pc": 8,
      "executed": {
        "function": "_Z3addii",
        "pc": 7,
        "instruction": "mov dword ptr [rbp - 4], eax"
      },
      "registers": {
        "rsp": 4064,
        "rbp": 4064,
        "rax": 42,
        "rdi": 40,
        "rsi": 2,
        "rdx": 40
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4096,
          "size": 8,
          "value": 4224,
          "label": "Сохранённый RBP",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4092,
          "size": 4,
          "value": 40,
          "label": "a",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4088,
          "size": 4,
          "value": 2,
          "label": "b",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4084,
          "size": 4,
          "value": null,
          "label": "answer",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4080,
          "size": 4,
          "value": null,
          "label": "Выравнивание",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4072,
          "size": 8,
          "value": "main:10",
          "label": "Возврат к записи answer",
          "frame": "_Z3addii",
          "active": true,
          "redZone": false
        },
        {
          "address": 4064,
          "size": 8,
          "value": 4096,
          "label": "Сохранённый RBP",
          "frame": "_Z3addii",
          "active": true,
          "redZone": false
        },
        {
          "address": 4044,
          "size": 4,
          "value": 40,
          "label": "a (копия аргумента)",
          "frame": "_Z3addii",
          "active": true,
          "redZone": true
        },
        {
          "address": 4040,
          "size": 4,
          "value": 2,
          "label": "b (копия аргумента)",
          "frame": "_Z3addii",
          "active": true,
          "redZone": true
        },
        {
          "address": 4060,
          "size": 4,
          "value": 42,
          "label": "result",
          "frame": "_Z3addii",
          "active": true,
          "redZone": true
        }
      ],
      "message": "В слот «result» записано 42: 4 байта для int. Он в red zone — области до 128 байт ниже RSP. В этом листинге add не сдвигает RSP для локальных данных.",
      "changedRegisters": [],
      "changedSlots": [
        4060
      ],
      "releasedSlots": []
    },
    {
      "function": "_Z3addii",
      "pc": 9,
      "executed": {
        "function": "_Z3addii",
        "pc": 8,
        "instruction": "mov eax, dword ptr [rbp - 4]"
      },
      "registers": {
        "rsp": 4064,
        "rbp": 4064,
        "rax": 42,
        "rdi": 40,
        "rsi": 2,
        "rdx": 40
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4096,
          "size": 8,
          "value": 4224,
          "label": "Сохранённый RBP",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4092,
          "size": 4,
          "value": 40,
          "label": "a",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4088,
          "size": 4,
          "value": 2,
          "label": "b",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4084,
          "size": 4,
          "value": null,
          "label": "answer",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4080,
          "size": 4,
          "value": null,
          "label": "Выравнивание",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4072,
          "size": 8,
          "value": "main:10",
          "label": "Возврат к записи answer",
          "frame": "_Z3addii",
          "active": true,
          "redZone": false
        },
        {
          "address": 4064,
          "size": 8,
          "value": 4096,
          "label": "Сохранённый RBP",
          "frame": "_Z3addii",
          "active": true,
          "redZone": false
        },
        {
          "address": 4044,
          "size": 4,
          "value": 40,
          "label": "a (копия аргумента)",
          "frame": "_Z3addii",
          "active": true,
          "redZone": true
        },
        {
          "address": 4040,
          "size": 4,
          "value": 2,
          "label": "b (копия аргумента)",
          "frame": "_Z3addii",
          "active": true,
          "redZone": true
        },
        {
          "address": 4060,
          "size": 4,
          "value": 42,
          "label": "result",
          "frame": "_Z3addii",
          "active": true,
          "redZone": true
        }
      ],
      "message": "EAX получает 42. Запись в EAX обнуляет старшие 32 бита RAX.",
      "changedRegisters": [
        "rax"
      ],
      "changedSlots": [],
      "releasedSlots": []
    },
    {
      "function": "_Z3addii",
      "pc": 10,
      "executed": {
        "function": "_Z3addii",
        "pc": 9,
        "instruction": "pop rbp"
      },
      "registers": {
        "rsp": 4072,
        "rbp": 4096,
        "rax": 42,
        "rdi": 40,
        "rsi": 2,
        "rdx": 40
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4096,
          "size": 8,
          "value": 4224,
          "label": "Сохранённый RBP",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4092,
          "size": 4,
          "value": 40,
          "label": "a",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4088,
          "size": 4,
          "value": 2,
          "label": "b",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4084,
          "size": 4,
          "value": null,
          "label": "answer",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4080,
          "size": 4,
          "value": null,
          "label": "Выравнивание",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4072,
          "size": 8,
          "value": "main:10",
          "label": "Возврат к записи answer",
          "frame": "_Z3addii",
          "active": true,
          "redZone": false
        },
        {
          "address": 4064,
          "size": 8,
          "value": 4096,
          "label": "Сохранённый RBP",
          "frame": "_Z3addii",
          "active": false,
          "redZone": false
        },
        {
          "address": 4044,
          "size": 4,
          "value": 40,
          "label": "a (копия аргумента)",
          "frame": "_Z3addii",
          "active": false,
          "redZone": false
        },
        {
          "address": 4040,
          "size": 4,
          "value": 2,
          "label": "b (копия аргумента)",
          "frame": "_Z3addii",
          "active": false,
          "redZone": false
        },
        {
          "address": 4060,
          "size": 4,
          "value": 42,
          "label": "result",
          "frame": "_Z3addii",
          "active": false,
          "redZone": false
        }
      ],
      "message": "pop rbp восстанавливает RBP main и увеличивает RSP на 8. Локальные слоты add больше не используются.",
      "changedRegisters": [
        "rbp",
        "rsp"
      ],
      "changedSlots": [],
      "releasedSlots": [
        4064,
        4044,
        4040,
        4060
      ]
    },
    {
      "function": "main",
      "pc": 10,
      "executed": {
        "function": "_Z3addii",
        "pc": 10,
        "instruction": "ret"
      },
      "registers": {
        "rsp": 4080,
        "rbp": 4096,
        "rax": 42,
        "rdi": 40,
        "rsi": 2,
        "rdx": 40
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4096,
          "size": 8,
          "value": 4224,
          "label": "Сохранённый RBP",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4092,
          "size": 4,
          "value": 40,
          "label": "a",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4088,
          "size": 4,
          "value": 2,
          "label": "b",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4084,
          "size": 4,
          "value": null,
          "label": "answer",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4080,
          "size": 4,
          "value": null,
          "label": "Выравнивание",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4072,
          "size": 8,
          "value": "main:10",
          "label": "Возврат к записи answer",
          "frame": "_Z3addii",
          "active": false,
          "redZone": false
        },
        {
          "address": 4064,
          "size": 8,
          "value": 4096,
          "label": "Сохранённый RBP",
          "frame": "_Z3addii",
          "active": false,
          "redZone": false
        },
        {
          "address": 4044,
          "size": 4,
          "value": 40,
          "label": "a (копия аргумента)",
          "frame": "_Z3addii",
          "active": false,
          "redZone": false
        },
        {
          "address": 4040,
          "size": 4,
          "value": 2,
          "label": "b (копия аргумента)",
          "frame": "_Z3addii",
          "active": false,
          "redZone": false
        },
        {
          "address": 4060,
          "size": 4,
          "value": 42,
          "label": "result",
          "frame": "_Z3addii",
          "active": false,
          "redZone": false
        }
      ],
      "message": "ret забирает адрес возврата из стека. Следующая инструкция main запишет EAX = 42 в answer.",
      "changedRegisters": [
        "rsp"
      ],
      "changedSlots": [],
      "releasedSlots": [
        4072
      ]
    },
    {
      "function": "main",
      "pc": 11,
      "executed": {
        "function": "main",
        "pc": 10,
        "instruction": "mov dword ptr [rbp - 12], eax"
      },
      "registers": {
        "rsp": 4080,
        "rbp": 4096,
        "rax": 42,
        "rdi": 40,
        "rsi": 2,
        "rdx": 40
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4096,
          "size": 8,
          "value": 4224,
          "label": "Сохранённый RBP",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4092,
          "size": 4,
          "value": 40,
          "label": "a",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4088,
          "size": 4,
          "value": 2,
          "label": "b",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4084,
          "size": 4,
          "value": 42,
          "label": "answer",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4080,
          "size": 4,
          "value": null,
          "label": "Выравнивание",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4072,
          "size": 8,
          "value": "main:10",
          "label": "Возврат к записи answer",
          "frame": "_Z3addii",
          "active": false,
          "redZone": false
        },
        {
          "address": 4064,
          "size": 8,
          "value": 4096,
          "label": "Сохранённый RBP",
          "frame": "_Z3addii",
          "active": false,
          "redZone": false
        },
        {
          "address": 4044,
          "size": 4,
          "value": 40,
          "label": "a (копия аргумента)",
          "frame": "_Z3addii",
          "active": false,
          "redZone": false
        },
        {
          "address": 4040,
          "size": 4,
          "value": 2,
          "label": "b (копия аргумента)",
          "frame": "_Z3addii",
          "active": false,
          "redZone": false
        },
        {
          "address": 4060,
          "size": 4,
          "value": 42,
          "label": "result",
          "frame": "_Z3addii",
          "active": false,
          "redZone": false
        }
      ],
      "message": "В слот «answer» записано 42: 4 байта для int.",
      "changedRegisters": [],
      "changedSlots": [
        4084
      ],
      "releasedSlots": []
    },
    {
      "function": "main",
      "pc": 12,
      "executed": {
        "function": "main",
        "pc": 11,
        "instruction": "mov eax, dword ptr [rbp - 12]"
      },
      "registers": {
        "rsp": 4080,
        "rbp": 4096,
        "rax": 42,
        "rdi": 40,
        "rsi": 2,
        "rdx": 40
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4096,
          "size": 8,
          "value": 4224,
          "label": "Сохранённый RBP",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4092,
          "size": 4,
          "value": 40,
          "label": "a",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4088,
          "size": 4,
          "value": 2,
          "label": "b",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4084,
          "size": 4,
          "value": 42,
          "label": "answer",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4080,
          "size": 4,
          "value": null,
          "label": "Выравнивание",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4072,
          "size": 8,
          "value": "main:10",
          "label": "Возврат к записи answer",
          "frame": "_Z3addii",
          "active": false,
          "redZone": false
        },
        {
          "address": 4064,
          "size": 8,
          "value": 4096,
          "label": "Сохранённый RBP",
          "frame": "_Z3addii",
          "active": false,
          "redZone": false
        },
        {
          "address": 4044,
          "size": 4,
          "value": 40,
          "label": "a (копия аргумента)",
          "frame": "_Z3addii",
          "active": false,
          "redZone": false
        },
        {
          "address": 4040,
          "size": 4,
          "value": 2,
          "label": "b (копия аргумента)",
          "frame": "_Z3addii",
          "active": false,
          "redZone": false
        },
        {
          "address": 4060,
          "size": 4,
          "value": 42,
          "label": "result",
          "frame": "_Z3addii",
          "active": false,
          "redZone": false
        }
      ],
      "message": "EAX получает 42. Запись в EAX обнуляет старшие 32 бита RAX.",
      "changedRegisters": [
        "rax"
      ],
      "changedSlots": [],
      "releasedSlots": []
    },
    {
      "function": "main",
      "pc": 13,
      "executed": {
        "function": "main",
        "pc": 12,
        "instruction": "leave",
        "part": 1,
        "parts": 2,
        "effect": "mov rsp, rbp"
      },
      "registers": {
        "rsp": 4096,
        "rbp": 4096,
        "rax": 42,
        "rdi": 40,
        "rsi": 2,
        "rdx": 40
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4096,
          "size": 8,
          "value": 4224,
          "label": "Сохранённый RBP",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4092,
          "size": 4,
          "value": 40,
          "label": "a",
          "frame": "main",
          "active": false,
          "redZone": false
        },
        {
          "address": 4088,
          "size": 4,
          "value": 2,
          "label": "b",
          "frame": "main",
          "active": false,
          "redZone": false
        },
        {
          "address": 4084,
          "size": 4,
          "value": 42,
          "label": "answer",
          "frame": "main",
          "active": false,
          "redZone": false
        },
        {
          "address": 4080,
          "size": 4,
          "value": null,
          "label": "Выравнивание",
          "frame": "main",
          "active": false,
          "redZone": false
        },
        {
          "address": 4072,
          "size": 8,
          "value": "main:10",
          "label": "Возврат к записи answer",
          "frame": "_Z3addii",
          "active": false,
          "redZone": false
        },
        {
          "address": 4064,
          "size": 8,
          "value": 4096,
          "label": "Сохранённый RBP",
          "frame": "_Z3addii",
          "active": false,
          "redZone": false
        },
        {
          "address": 4044,
          "size": 4,
          "value": 40,
          "label": "a (копия аргумента)",
          "frame": "_Z3addii",
          "active": false,
          "redZone": false
        },
        {
          "address": 4040,
          "size": 4,
          "value": 2,
          "label": "b (копия аргумента)",
          "frame": "_Z3addii",
          "active": false,
          "redZone": false
        },
        {
          "address": 4060,
          "size": 4,
          "value": 42,
          "label": "result",
          "frame": "_Z3addii",
          "active": false,
          "redZone": false
        }
      ],
      "message": "leave, 1/2: RSP получает RBP. Локальная область main снята со стека; байты не обнуляются. Сохранённый RBP пока ещё в стеке.",
      "changedRegisters": [
        "rsp"
      ],
      "changedSlots": [],
      "releasedSlots": [
        4092,
        4088,
        4084,
        4080
      ]
    },
    {
      "function": "main",
      "pc": 13,
      "executed": {
        "function": "main",
        "pc": 12,
        "instruction": "leave",
        "part": 2,
        "parts": 2,
        "effect": "pop rbp"
      },
      "registers": {
        "rsp": 4104,
        "rbp": 4224,
        "rax": 42,
        "rdi": 40,
        "rsi": 2,
        "rdx": 40
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "main",
          "active": true,
          "redZone": false
        },
        {
          "address": 4096,
          "size": 8,
          "value": 4224,
          "label": "Сохранённый RBP",
          "frame": "main",
          "active": false,
          "redZone": false
        },
        {
          "address": 4092,
          "size": 4,
          "value": 40,
          "label": "a",
          "frame": "main",
          "active": false,
          "redZone": false
        },
        {
          "address": 4088,
          "size": 4,
          "value": 2,
          "label": "b",
          "frame": "main",
          "active": false,
          "redZone": false
        },
        {
          "address": 4084,
          "size": 4,
          "value": 42,
          "label": "answer",
          "frame": "main",
          "active": false,
          "redZone": false
        },
        {
          "address": 4080,
          "size": 4,
          "value": null,
          "label": "Выравнивание",
          "frame": "main",
          "active": false,
          "redZone": false
        },
        {
          "address": 4072,
          "size": 8,
          "value": "main:10",
          "label": "Возврат к записи answer",
          "frame": "_Z3addii",
          "active": false,
          "redZone": false
        },
        {
          "address": 4064,
          "size": 8,
          "value": 4096,
          "label": "Сохранённый RBP",
          "frame": "_Z3addii",
          "active": false,
          "redZone": false
        },
        {
          "address": 4044,
          "size": 4,
          "value": 40,
          "label": "a (копия аргумента)",
          "frame": "_Z3addii",
          "active": false,
          "redZone": false
        },
        {
          "address": 4040,
          "size": 4,
          "value": 2,
          "label": "b (копия аргумента)",
          "frame": "_Z3addii",
          "active": false,
          "redZone": false
        },
        {
          "address": 4060,
          "size": 4,
          "value": 42,
          "label": "result",
          "frame": "_Z3addii",
          "active": false,
          "redZone": false
        }
      ],
      "message": "leave, 2/2: восстановлен RBP вызывающего кода; RSP увеличился на 8. На вершине остался адрес возврата из main.",
      "changedRegisters": [
        "rbp",
        "rsp"
      ],
      "changedSlots": [],
      "releasedSlots": [
        4096
      ]
    },
    {
      "function": "done",
      "pc": 0,
      "executed": {
        "function": "main",
        "pc": 13,
        "instruction": "ret"
      },
      "registers": {
        "rsp": 4112,
        "rbp": 4224,
        "rax": 42,
        "rdi": 40,
        "rsi": 2,
        "rdx": 40
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "main",
          "active": false,
          "redZone": false
        },
        {
          "address": 4096,
          "size": 8,
          "value": 4224,
          "label": "Сохранённый RBP",
          "frame": "main",
          "active": false,
          "redZone": false
        },
        {
          "address": 4092,
          "size": 4,
          "value": 40,
          "label": "a",
          "frame": "main",
          "active": false,
          "redZone": false
        },
        {
          "address": 4088,
          "size": 4,
          "value": 2,
          "label": "b",
          "frame": "main",
          "active": false,
          "redZone": false
        },
        {
          "address": 4084,
          "size": 4,
          "value": 42,
          "label": "answer",
          "frame": "main",
          "active": false,
          "redZone": false
        },
        {
          "address": 4080,
          "size": 4,
          "value": null,
          "label": "Выравнивание",
          "frame": "main",
          "active": false,
          "redZone": false
        },
        {
          "address": 4072,
          "size": 8,
          "value": "main:10",
          "label": "Возврат к записи answer",
          "frame": "_Z3addii",
          "active": false,
          "redZone": false
        },
        {
          "address": 4064,
          "size": 8,
          "value": 4096,
          "label": "Сохранённый RBP",
          "frame": "_Z3addii",
          "active": false,
          "redZone": false
        },
        {
          "address": 4044,
          "size": 4,
          "value": 40,
          "label": "a (копия аргумента)",
          "frame": "_Z3addii",
          "active": false,
          "redZone": false
        },
        {
          "address": 4040,
          "size": 4,
          "value": 2,
          "label": "b (копия аргумента)",
          "frame": "_Z3addii",
          "active": false,
          "redZone": false
        },
        {
          "address": 4060,
          "size": 4,
          "value": 42,
          "label": "result",
          "frame": "_Z3addii",
          "active": false,
          "redZone": false
        }
      ],
      "message": "main вернула 42 через EAX. Кадр main снят; программа завершится с кодом 42.",
      "changedRegisters": [
        "rsp"
      ],
      "changedSlots": [],
      "releasedSlots": [
        4104
      ]
    }
  ],
  "origin": "Листинг Compiler Explorer, предоставленный для лекции: x86-64, System V ABI."
};
