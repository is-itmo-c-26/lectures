window.STACK_TRACE = {
  "source": "int add(int a, int b) {\n    int result = a + b;\n    return result;\n}\n\nint main() {\n    int a = 40;\n    int b = 2;\n    int answer = add(a, b);\n    return answer;\n}\n",
  "assembly": "\t.intel_syntax noprefix\n\t.file\t\"function-call.cpp\"\n\t.text\n\t.globl\t_Z3addii                        # -- Begin function _Z3addii\n\t.p2align\t4\n\t.type\t_Z3addii,@function\n_Z3addii:                               # @_Z3addii\n# %bb.0:\n\tpush\trbp\n\tmov\trbp, rsp\n\tsub\trsp, 12\n\tmov\tdword ptr [rbp - 4], edi\n\tmov\tdword ptr [rbp - 8], esi\n\tmov\teax, dword ptr [rbp - 4]\n\tadd\teax, dword ptr [rbp - 8]\n\tmov\tdword ptr [rbp - 12], eax\n\tmov\teax, dword ptr [rbp - 12]\n\tadd\trsp, 12\n\tpop\trbp\n\tret\n.Lfunc_end0:\n\t.size\t_Z3addii, .Lfunc_end0-_Z3addii\n                                        # -- End function\n\t.globl\tmain                            # -- Begin function main\n\t.p2align\t4\n\t.type\tmain,@function\nmain:                                   # @main\n# %bb.0:\n\tpush\trbp\n\tmov\trbp, rsp\n\tsub\trsp, 16\n\tmov\tdword ptr [rbp - 4], 0\n\tmov\tdword ptr [rbp - 8], 40\n\tmov\tdword ptr [rbp - 12], 2\n\tmov\tedi, dword ptr [rbp - 8]\n\tmov\tesi, dword ptr [rbp - 12]\n\tcall\t_Z3addii\n\tmov\tdword ptr [rbp - 16], eax\n\tmov\teax, dword ptr [rbp - 16]\n\tadd\trsp, 16\n\tpop\trbp\n\tret\n.Lfunc_end1:\n\t.size\tmain, .Lfunc_end1-main\n                                        # -- End function\n\t.ident\t\"Homebrew clang version 21.1.1\"\n\t.section\t\".note.GNU-stack\",\"\",@progbits\n\t.addrsig\n\t.addrsig_sym _Z3addii\n",
  "functions": {
    "_Z3addii": [
      "push rbp",
      "mov rbp, rsp",
      "sub rsp, 12",
      "mov dword ptr [rbp - 4], edi",
      "mov dword ptr [rbp - 8], esi",
      "mov eax, dword ptr [rbp - 4]",
      "add eax, dword ptr [rbp - 8]",
      "mov dword ptr [rbp - 12], eax",
      "mov eax, dword ptr [rbp - 12]",
      "add rsp, 12",
      "pop rbp",
      "ret"
    ],
    "main": [
      "push rbp",
      "mov rbp, rsp",
      "sub rsp, 16",
      "mov dword ptr [rbp - 4], 0",
      "mov dword ptr [rbp - 8], 40",
      "mov dword ptr [rbp - 12], 2",
      "mov edi, dword ptr [rbp - 8]",
      "mov esi, dword ptr [rbp - 12]",
      "call _Z3addii",
      "mov dword ptr [rbp - 16], eax",
      "mov eax, dword ptr [rbp - 16]",
      "add rsp, 16",
      "pop rbp",
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
        "rsi": null
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "caller"
        }
      ],
      "message": "Вход в main. Вызывающий код уже положил адрес возврата в стек. Адреса условные; значения остальных регистров пока неизвестны.",
      "changedRegisters": [],
      "changedSlots": []
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
        "rsi": null
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "caller"
        },
        {
          "address": 4096,
          "size": 8,
          "value": 4224,
          "label": "Сохранённый RBP",
          "frame": "main"
        }
      ],
      "message": "push rbp: RSP уменьшился на 8; прежний RBP сохранён в стеке.",
      "changedRegisters": [
        "rsp"
      ],
      "changedSlots": [
        4096
      ]
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
        "rsi": null
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "caller"
        },
        {
          "address": 4096,
          "size": 8,
          "value": 4224,
          "label": "Сохранённый RBP",
          "frame": "main"
        }
      ],
      "message": "RBP получает 0x1000. Теперь RBP указывает на основание текущего кадра.",
      "changedRegisters": [
        "rbp"
      ],
      "changedSlots": []
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
        "rsi": null
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "caller"
        },
        {
          "address": 4096,
          "size": 8,
          "value": 4224,
          "label": "Сохранённый RBP",
          "frame": "main"
        },
        {
          "address": 4092,
          "size": 4,
          "value": null,
          "label": "Служебный слот Clang",
          "frame": "main"
        },
        {
          "address": 4088,
          "size": 4,
          "value": null,
          "label": "a",
          "frame": "main"
        },
        {
          "address": 4084,
          "size": 4,
          "value": null,
          "label": "b",
          "frame": "main"
        },
        {
          "address": 4080,
          "size": 4,
          "value": null,
          "label": "answer",
          "frame": "main"
        }
      ],
      "message": "RSP уменьшился на 16: зарезервирована память кадра. Резервирование не задаёт значения переменным.",
      "changedRegisters": [
        "rsp"
      ],
      "changedSlots": [
        4092,
        4088,
        4084,
        4080
      ]
    },
    {
      "function": "main",
      "pc": 4,
      "executed": {
        "function": "main",
        "pc": 3,
        "instruction": "mov dword ptr [rbp - 4], 0"
      },
      "registers": {
        "rsp": 4080,
        "rbp": 4096,
        "rax": null,
        "rdi": null,
        "rsi": null
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "caller"
        },
        {
          "address": 4096,
          "size": 8,
          "value": 4224,
          "label": "Сохранённый RBP",
          "frame": "main"
        },
        {
          "address": 4092,
          "size": 4,
          "value": 0,
          "label": "Служебный слот Clang",
          "frame": "main"
        },
        {
          "address": 4088,
          "size": 4,
          "value": null,
          "label": "a",
          "frame": "main"
        },
        {
          "address": 4084,
          "size": 4,
          "value": null,
          "label": "b",
          "frame": "main"
        },
        {
          "address": 4080,
          "size": 4,
          "value": null,
          "label": "answer",
          "frame": "main"
        }
      ],
      "message": "В слот «Служебный слот Clang» записано 0. Это 4 байта, потому что здесь хранится int.",
      "changedRegisters": [],
      "changedSlots": [
        4092
      ]
    },
    {
      "function": "main",
      "pc": 5,
      "executed": {
        "function": "main",
        "pc": 4,
        "instruction": "mov dword ptr [rbp - 8], 40"
      },
      "registers": {
        "rsp": 4080,
        "rbp": 4096,
        "rax": null,
        "rdi": null,
        "rsi": null
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "caller"
        },
        {
          "address": 4096,
          "size": 8,
          "value": 4224,
          "label": "Сохранённый RBP",
          "frame": "main"
        },
        {
          "address": 4092,
          "size": 4,
          "value": 0,
          "label": "Служебный слот Clang",
          "frame": "main"
        },
        {
          "address": 4088,
          "size": 4,
          "value": 40,
          "label": "a",
          "frame": "main"
        },
        {
          "address": 4084,
          "size": 4,
          "value": null,
          "label": "b",
          "frame": "main"
        },
        {
          "address": 4080,
          "size": 4,
          "value": null,
          "label": "answer",
          "frame": "main"
        }
      ],
      "message": "В слот «a» записано 40. Это 4 байта, потому что здесь хранится int.",
      "changedRegisters": [],
      "changedSlots": [
        4088
      ]
    },
    {
      "function": "main",
      "pc": 6,
      "executed": {
        "function": "main",
        "pc": 5,
        "instruction": "mov dword ptr [rbp - 12], 2"
      },
      "registers": {
        "rsp": 4080,
        "rbp": 4096,
        "rax": null,
        "rdi": null,
        "rsi": null
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "caller"
        },
        {
          "address": 4096,
          "size": 8,
          "value": 4224,
          "label": "Сохранённый RBP",
          "frame": "main"
        },
        {
          "address": 4092,
          "size": 4,
          "value": 0,
          "label": "Служебный слот Clang",
          "frame": "main"
        },
        {
          "address": 4088,
          "size": 4,
          "value": 40,
          "label": "a",
          "frame": "main"
        },
        {
          "address": 4084,
          "size": 4,
          "value": 2,
          "label": "b",
          "frame": "main"
        },
        {
          "address": 4080,
          "size": 4,
          "value": null,
          "label": "answer",
          "frame": "main"
        }
      ],
      "message": "В слот «b» записано 2. Это 4 байта, потому что здесь хранится int.",
      "changedRegisters": [],
      "changedSlots": [
        4084
      ]
    },
    {
      "function": "main",
      "pc": 7,
      "executed": {
        "function": "main",
        "pc": 6,
        "instruction": "mov edi, dword ptr [rbp - 8]"
      },
      "registers": {
        "rsp": 4080,
        "rbp": 4096,
        "rax": null,
        "rdi": 40,
        "rsi": null
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "caller"
        },
        {
          "address": 4096,
          "size": 8,
          "value": 4224,
          "label": "Сохранённый RBP",
          "frame": "main"
        },
        {
          "address": 4092,
          "size": 4,
          "value": 0,
          "label": "Служебный слот Clang",
          "frame": "main"
        },
        {
          "address": 4088,
          "size": 4,
          "value": 40,
          "label": "a",
          "frame": "main"
        },
        {
          "address": 4084,
          "size": 4,
          "value": 2,
          "label": "b",
          "frame": "main"
        },
        {
          "address": 4080,
          "size": 4,
          "value": null,
          "label": "answer",
          "frame": "main"
        }
      ],
      "message": "EDI получает 40. Запись в EDI обнуляет старшие 32 бита RDI.",
      "changedRegisters": [
        "rdi"
      ],
      "changedSlots": []
    },
    {
      "function": "main",
      "pc": 8,
      "executed": {
        "function": "main",
        "pc": 7,
        "instruction": "mov esi, dword ptr [rbp - 12]"
      },
      "registers": {
        "rsp": 4080,
        "rbp": 4096,
        "rax": null,
        "rdi": 40,
        "rsi": 2
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "caller"
        },
        {
          "address": 4096,
          "size": 8,
          "value": 4224,
          "label": "Сохранённый RBP",
          "frame": "main"
        },
        {
          "address": 4092,
          "size": 4,
          "value": 0,
          "label": "Служебный слот Clang",
          "frame": "main"
        },
        {
          "address": 4088,
          "size": 4,
          "value": 40,
          "label": "a",
          "frame": "main"
        },
        {
          "address": 4084,
          "size": 4,
          "value": 2,
          "label": "b",
          "frame": "main"
        },
        {
          "address": 4080,
          "size": 4,
          "value": null,
          "label": "answer",
          "frame": "main"
        }
      ],
      "message": "ESI получает 2. Запись в ESI обнуляет старшие 32 бита RSI.",
      "changedRegisters": [
        "rsi"
      ],
      "changedSlots": []
    },
    {
      "function": "_Z3addii",
      "pc": 0,
      "executed": {
        "function": "main",
        "pc": 8,
        "instruction": "call _Z3addii"
      },
      "registers": {
        "rsp": 4072,
        "rbp": 4096,
        "rax": null,
        "rdi": 40,
        "rsi": 2
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "caller"
        },
        {
          "address": 4096,
          "size": 8,
          "value": 4224,
          "label": "Сохранённый RBP",
          "frame": "main"
        },
        {
          "address": 4092,
          "size": 4,
          "value": 0,
          "label": "Служебный слот Clang",
          "frame": "main"
        },
        {
          "address": 4088,
          "size": 4,
          "value": 40,
          "label": "a",
          "frame": "main"
        },
        {
          "address": 4084,
          "size": 4,
          "value": 2,
          "label": "b",
          "frame": "main"
        },
        {
          "address": 4080,
          "size": 4,
          "value": null,
          "label": "answer",
          "frame": "main"
        },
        {
          "address": 4072,
          "size": 8,
          "value": "main:9",
          "label": "Возврат к записи answer",
          "frame": "main"
        }
      ],
      "message": "call сохраняет адрес следующей инструкции и передаёт управление add. Аргументы уже в EDI = 40 и ESI = 2.",
      "changedRegisters": [
        "rsp"
      ],
      "changedSlots": [
        4072
      ]
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
        "rax": null,
        "rdi": 40,
        "rsi": 2
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "caller"
        },
        {
          "address": 4096,
          "size": 8,
          "value": 4224,
          "label": "Сохранённый RBP",
          "frame": "main"
        },
        {
          "address": 4092,
          "size": 4,
          "value": 0,
          "label": "Служебный слот Clang",
          "frame": "main"
        },
        {
          "address": 4088,
          "size": 4,
          "value": 40,
          "label": "a",
          "frame": "main"
        },
        {
          "address": 4084,
          "size": 4,
          "value": 2,
          "label": "b",
          "frame": "main"
        },
        {
          "address": 4080,
          "size": 4,
          "value": null,
          "label": "answer",
          "frame": "main"
        },
        {
          "address": 4072,
          "size": 8,
          "value": "main:9",
          "label": "Возврат к записи answer",
          "frame": "main"
        },
        {
          "address": 4064,
          "size": 8,
          "value": 4096,
          "label": "Сохранённый RBP",
          "frame": "_Z3addii"
        }
      ],
      "message": "push rbp: RSP уменьшился на 8; прежний RBP сохранён в стеке.",
      "changedRegisters": [
        "rsp"
      ],
      "changedSlots": [
        4064
      ]
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
        "rax": null,
        "rdi": 40,
        "rsi": 2
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "caller"
        },
        {
          "address": 4096,
          "size": 8,
          "value": 4224,
          "label": "Сохранённый RBP",
          "frame": "main"
        },
        {
          "address": 4092,
          "size": 4,
          "value": 0,
          "label": "Служебный слот Clang",
          "frame": "main"
        },
        {
          "address": 4088,
          "size": 4,
          "value": 40,
          "label": "a",
          "frame": "main"
        },
        {
          "address": 4084,
          "size": 4,
          "value": 2,
          "label": "b",
          "frame": "main"
        },
        {
          "address": 4080,
          "size": 4,
          "value": null,
          "label": "answer",
          "frame": "main"
        },
        {
          "address": 4072,
          "size": 8,
          "value": "main:9",
          "label": "Возврат к записи answer",
          "frame": "main"
        },
        {
          "address": 4064,
          "size": 8,
          "value": 4096,
          "label": "Сохранённый RBP",
          "frame": "_Z3addii"
        }
      ],
      "message": "RBP получает 0xfe0. Теперь RBP указывает на основание текущего кадра.",
      "changedRegisters": [
        "rbp"
      ],
      "changedSlots": []
    },
    {
      "function": "_Z3addii",
      "pc": 3,
      "executed": {
        "function": "_Z3addii",
        "pc": 2,
        "instruction": "sub rsp, 12"
      },
      "registers": {
        "rsp": 4052,
        "rbp": 4064,
        "rax": null,
        "rdi": 40,
        "rsi": 2
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "caller"
        },
        {
          "address": 4096,
          "size": 8,
          "value": 4224,
          "label": "Сохранённый RBP",
          "frame": "main"
        },
        {
          "address": 4092,
          "size": 4,
          "value": 0,
          "label": "Служебный слот Clang",
          "frame": "main"
        },
        {
          "address": 4088,
          "size": 4,
          "value": 40,
          "label": "a",
          "frame": "main"
        },
        {
          "address": 4084,
          "size": 4,
          "value": 2,
          "label": "b",
          "frame": "main"
        },
        {
          "address": 4080,
          "size": 4,
          "value": null,
          "label": "answer",
          "frame": "main"
        },
        {
          "address": 4072,
          "size": 8,
          "value": "main:9",
          "label": "Возврат к записи answer",
          "frame": "main"
        },
        {
          "address": 4064,
          "size": 8,
          "value": 4096,
          "label": "Сохранённый RBP",
          "frame": "_Z3addii"
        },
        {
          "address": 4060,
          "size": 4,
          "value": null,
          "label": "a (копия аргумента)",
          "frame": "_Z3addii"
        },
        {
          "address": 4056,
          "size": 4,
          "value": null,
          "label": "b (копия аргумента)",
          "frame": "_Z3addii"
        },
        {
          "address": 4052,
          "size": 4,
          "value": null,
          "label": "result",
          "frame": "_Z3addii"
        }
      ],
      "message": "RSP уменьшился на 12: зарезервирована память кадра. Резервирование не задаёт значения переменным.",
      "changedRegisters": [
        "rsp"
      ],
      "changedSlots": [
        4060,
        4056,
        4052
      ]
    },
    {
      "function": "_Z3addii",
      "pc": 4,
      "executed": {
        "function": "_Z3addii",
        "pc": 3,
        "instruction": "mov dword ptr [rbp - 4], edi"
      },
      "registers": {
        "rsp": 4052,
        "rbp": 4064,
        "rax": null,
        "rdi": 40,
        "rsi": 2
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "caller"
        },
        {
          "address": 4096,
          "size": 8,
          "value": 4224,
          "label": "Сохранённый RBP",
          "frame": "main"
        },
        {
          "address": 4092,
          "size": 4,
          "value": 0,
          "label": "Служебный слот Clang",
          "frame": "main"
        },
        {
          "address": 4088,
          "size": 4,
          "value": 40,
          "label": "a",
          "frame": "main"
        },
        {
          "address": 4084,
          "size": 4,
          "value": 2,
          "label": "b",
          "frame": "main"
        },
        {
          "address": 4080,
          "size": 4,
          "value": null,
          "label": "answer",
          "frame": "main"
        },
        {
          "address": 4072,
          "size": 8,
          "value": "main:9",
          "label": "Возврат к записи answer",
          "frame": "main"
        },
        {
          "address": 4064,
          "size": 8,
          "value": 4096,
          "label": "Сохранённый RBP",
          "frame": "_Z3addii"
        },
        {
          "address": 4060,
          "size": 4,
          "value": 40,
          "label": "a (копия аргумента)",
          "frame": "_Z3addii"
        },
        {
          "address": 4056,
          "size": 4,
          "value": null,
          "label": "b (копия аргумента)",
          "frame": "_Z3addii"
        },
        {
          "address": 4052,
          "size": 4,
          "value": null,
          "label": "result",
          "frame": "_Z3addii"
        }
      ],
      "message": "В слот «a (копия аргумента)» записано 40. Это 4 байта, потому что здесь хранится int.",
      "changedRegisters": [],
      "changedSlots": [
        4060
      ]
    },
    {
      "function": "_Z3addii",
      "pc": 5,
      "executed": {
        "function": "_Z3addii",
        "pc": 4,
        "instruction": "mov dword ptr [rbp - 8], esi"
      },
      "registers": {
        "rsp": 4052,
        "rbp": 4064,
        "rax": null,
        "rdi": 40,
        "rsi": 2
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "caller"
        },
        {
          "address": 4096,
          "size": 8,
          "value": 4224,
          "label": "Сохранённый RBP",
          "frame": "main"
        },
        {
          "address": 4092,
          "size": 4,
          "value": 0,
          "label": "Служебный слот Clang",
          "frame": "main"
        },
        {
          "address": 4088,
          "size": 4,
          "value": 40,
          "label": "a",
          "frame": "main"
        },
        {
          "address": 4084,
          "size": 4,
          "value": 2,
          "label": "b",
          "frame": "main"
        },
        {
          "address": 4080,
          "size": 4,
          "value": null,
          "label": "answer",
          "frame": "main"
        },
        {
          "address": 4072,
          "size": 8,
          "value": "main:9",
          "label": "Возврат к записи answer",
          "frame": "main"
        },
        {
          "address": 4064,
          "size": 8,
          "value": 4096,
          "label": "Сохранённый RBP",
          "frame": "_Z3addii"
        },
        {
          "address": 4060,
          "size": 4,
          "value": 40,
          "label": "a (копия аргумента)",
          "frame": "_Z3addii"
        },
        {
          "address": 4056,
          "size": 4,
          "value": 2,
          "label": "b (копия аргумента)",
          "frame": "_Z3addii"
        },
        {
          "address": 4052,
          "size": 4,
          "value": null,
          "label": "result",
          "frame": "_Z3addii"
        }
      ],
      "message": "В слот «b (копия аргумента)» записано 2. Это 4 байта, потому что здесь хранится int.",
      "changedRegisters": [],
      "changedSlots": [
        4056
      ]
    },
    {
      "function": "_Z3addii",
      "pc": 6,
      "executed": {
        "function": "_Z3addii",
        "pc": 5,
        "instruction": "mov eax, dword ptr [rbp - 4]"
      },
      "registers": {
        "rsp": 4052,
        "rbp": 4064,
        "rax": 40,
        "rdi": 40,
        "rsi": 2
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "caller"
        },
        {
          "address": 4096,
          "size": 8,
          "value": 4224,
          "label": "Сохранённый RBP",
          "frame": "main"
        },
        {
          "address": 4092,
          "size": 4,
          "value": 0,
          "label": "Служебный слот Clang",
          "frame": "main"
        },
        {
          "address": 4088,
          "size": 4,
          "value": 40,
          "label": "a",
          "frame": "main"
        },
        {
          "address": 4084,
          "size": 4,
          "value": 2,
          "label": "b",
          "frame": "main"
        },
        {
          "address": 4080,
          "size": 4,
          "value": null,
          "label": "answer",
          "frame": "main"
        },
        {
          "address": 4072,
          "size": 8,
          "value": "main:9",
          "label": "Возврат к записи answer",
          "frame": "main"
        },
        {
          "address": 4064,
          "size": 8,
          "value": 4096,
          "label": "Сохранённый RBP",
          "frame": "_Z3addii"
        },
        {
          "address": 4060,
          "size": 4,
          "value": 40,
          "label": "a (копия аргумента)",
          "frame": "_Z3addii"
        },
        {
          "address": 4056,
          "size": 4,
          "value": 2,
          "label": "b (копия аргумента)",
          "frame": "_Z3addii"
        },
        {
          "address": 4052,
          "size": 4,
          "value": null,
          "label": "result",
          "frame": "_Z3addii"
        }
      ],
      "message": "EAX получает 40. Запись в EAX обнуляет старшие 32 бита RAX.",
      "changedRegisters": [
        "rax"
      ],
      "changedSlots": []
    },
    {
      "function": "_Z3addii",
      "pc": 7,
      "executed": {
        "function": "_Z3addii",
        "pc": 6,
        "instruction": "add eax, dword ptr [rbp - 8]"
      },
      "registers": {
        "rsp": 4052,
        "rbp": 4064,
        "rax": 42,
        "rdi": 40,
        "rsi": 2
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "caller"
        },
        {
          "address": 4096,
          "size": 8,
          "value": 4224,
          "label": "Сохранённый RBP",
          "frame": "main"
        },
        {
          "address": 4092,
          "size": 4,
          "value": 0,
          "label": "Служебный слот Clang",
          "frame": "main"
        },
        {
          "address": 4088,
          "size": 4,
          "value": 40,
          "label": "a",
          "frame": "main"
        },
        {
          "address": 4084,
          "size": 4,
          "value": 2,
          "label": "b",
          "frame": "main"
        },
        {
          "address": 4080,
          "size": 4,
          "value": null,
          "label": "answer",
          "frame": "main"
        },
        {
          "address": 4072,
          "size": 8,
          "value": "main:9",
          "label": "Возврат к записи answer",
          "frame": "main"
        },
        {
          "address": 4064,
          "size": 8,
          "value": 4096,
          "label": "Сохранённый RBP",
          "frame": "_Z3addii"
        },
        {
          "address": 4060,
          "size": 4,
          "value": 40,
          "label": "a (копия аргумента)",
          "frame": "_Z3addii"
        },
        {
          "address": 4056,
          "size": 4,
          "value": 2,
          "label": "b (копия аргумента)",
          "frame": "_Z3addii"
        },
        {
          "address": 4052,
          "size": 4,
          "value": null,
          "label": "result",
          "frame": "_Z3addii"
        }
      ],
      "message": "EAX = 40 + 2 = 42. Результат вычисления сейчас находится в регистре.",
      "changedRegisters": [
        "rax"
      ],
      "changedSlots": []
    },
    {
      "function": "_Z3addii",
      "pc": 8,
      "executed": {
        "function": "_Z3addii",
        "pc": 7,
        "instruction": "mov dword ptr [rbp - 12], eax"
      },
      "registers": {
        "rsp": 4052,
        "rbp": 4064,
        "rax": 42,
        "rdi": 40,
        "rsi": 2
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "caller"
        },
        {
          "address": 4096,
          "size": 8,
          "value": 4224,
          "label": "Сохранённый RBP",
          "frame": "main"
        },
        {
          "address": 4092,
          "size": 4,
          "value": 0,
          "label": "Служебный слот Clang",
          "frame": "main"
        },
        {
          "address": 4088,
          "size": 4,
          "value": 40,
          "label": "a",
          "frame": "main"
        },
        {
          "address": 4084,
          "size": 4,
          "value": 2,
          "label": "b",
          "frame": "main"
        },
        {
          "address": 4080,
          "size": 4,
          "value": null,
          "label": "answer",
          "frame": "main"
        },
        {
          "address": 4072,
          "size": 8,
          "value": "main:9",
          "label": "Возврат к записи answer",
          "frame": "main"
        },
        {
          "address": 4064,
          "size": 8,
          "value": 4096,
          "label": "Сохранённый RBP",
          "frame": "_Z3addii"
        },
        {
          "address": 4060,
          "size": 4,
          "value": 40,
          "label": "a (копия аргумента)",
          "frame": "_Z3addii"
        },
        {
          "address": 4056,
          "size": 4,
          "value": 2,
          "label": "b (копия аргумента)",
          "frame": "_Z3addii"
        },
        {
          "address": 4052,
          "size": 4,
          "value": 42,
          "label": "result",
          "frame": "_Z3addii"
        }
      ],
      "message": "В слот «result» записано 42. Это 4 байта, потому что здесь хранится int.",
      "changedRegisters": [],
      "changedSlots": [
        4052
      ]
    },
    {
      "function": "_Z3addii",
      "pc": 9,
      "executed": {
        "function": "_Z3addii",
        "pc": 8,
        "instruction": "mov eax, dword ptr [rbp - 12]"
      },
      "registers": {
        "rsp": 4052,
        "rbp": 4064,
        "rax": 42,
        "rdi": 40,
        "rsi": 2
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "caller"
        },
        {
          "address": 4096,
          "size": 8,
          "value": 4224,
          "label": "Сохранённый RBP",
          "frame": "main"
        },
        {
          "address": 4092,
          "size": 4,
          "value": 0,
          "label": "Служебный слот Clang",
          "frame": "main"
        },
        {
          "address": 4088,
          "size": 4,
          "value": 40,
          "label": "a",
          "frame": "main"
        },
        {
          "address": 4084,
          "size": 4,
          "value": 2,
          "label": "b",
          "frame": "main"
        },
        {
          "address": 4080,
          "size": 4,
          "value": null,
          "label": "answer",
          "frame": "main"
        },
        {
          "address": 4072,
          "size": 8,
          "value": "main:9",
          "label": "Возврат к записи answer",
          "frame": "main"
        },
        {
          "address": 4064,
          "size": 8,
          "value": 4096,
          "label": "Сохранённый RBP",
          "frame": "_Z3addii"
        },
        {
          "address": 4060,
          "size": 4,
          "value": 40,
          "label": "a (копия аргумента)",
          "frame": "_Z3addii"
        },
        {
          "address": 4056,
          "size": 4,
          "value": 2,
          "label": "b (копия аргумента)",
          "frame": "_Z3addii"
        },
        {
          "address": 4052,
          "size": 4,
          "value": 42,
          "label": "result",
          "frame": "_Z3addii"
        }
      ],
      "message": "EAX получает 42. Запись в EAX обнуляет старшие 32 бита RAX.",
      "changedRegisters": [
        "rax"
      ],
      "changedSlots": []
    },
    {
      "function": "_Z3addii",
      "pc": 10,
      "executed": {
        "function": "_Z3addii",
        "pc": 9,
        "instruction": "add rsp, 12"
      },
      "registers": {
        "rsp": 4064,
        "rbp": 4064,
        "rax": 42,
        "rdi": 40,
        "rsi": 2
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "caller"
        },
        {
          "address": 4096,
          "size": 8,
          "value": 4224,
          "label": "Сохранённый RBP",
          "frame": "main"
        },
        {
          "address": 4092,
          "size": 4,
          "value": 0,
          "label": "Служебный слот Clang",
          "frame": "main"
        },
        {
          "address": 4088,
          "size": 4,
          "value": 40,
          "label": "a",
          "frame": "main"
        },
        {
          "address": 4084,
          "size": 4,
          "value": 2,
          "label": "b",
          "frame": "main"
        },
        {
          "address": 4080,
          "size": 4,
          "value": null,
          "label": "answer",
          "frame": "main"
        },
        {
          "address": 4072,
          "size": 8,
          "value": "main:9",
          "label": "Возврат к записи answer",
          "frame": "main"
        },
        {
          "address": 4064,
          "size": 8,
          "value": 4096,
          "label": "Сохранённый RBP",
          "frame": "_Z3addii"
        },
        {
          "address": 4060,
          "size": 4,
          "value": 40,
          "label": "a (копия аргумента)",
          "frame": "_Z3addii"
        },
        {
          "address": 4056,
          "size": 4,
          "value": 2,
          "label": "b (копия аргумента)",
          "frame": "_Z3addii"
        },
        {
          "address": 4052,
          "size": 4,
          "value": 42,
          "label": "result",
          "frame": "_Z3addii"
        }
      ],
      "message": "RSP увеличился на 12: локальная область кадра освобождена. Байты не обязаны стираться; серые ячейки уже вне активного стека.",
      "changedRegisters": [
        "rsp"
      ],
      "changedSlots": []
    },
    {
      "function": "_Z3addii",
      "pc": 11,
      "executed": {
        "function": "_Z3addii",
        "pc": 10,
        "instruction": "pop rbp"
      },
      "registers": {
        "rsp": 4072,
        "rbp": 4096,
        "rax": 42,
        "rdi": 40,
        "rsi": 2
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "caller"
        },
        {
          "address": 4096,
          "size": 8,
          "value": 4224,
          "label": "Сохранённый RBP",
          "frame": "main"
        },
        {
          "address": 4092,
          "size": 4,
          "value": 0,
          "label": "Служебный слот Clang",
          "frame": "main"
        },
        {
          "address": 4088,
          "size": 4,
          "value": 40,
          "label": "a",
          "frame": "main"
        },
        {
          "address": 4084,
          "size": 4,
          "value": 2,
          "label": "b",
          "frame": "main"
        },
        {
          "address": 4080,
          "size": 4,
          "value": null,
          "label": "answer",
          "frame": "main"
        },
        {
          "address": 4072,
          "size": 8,
          "value": "main:9",
          "label": "Возврат к записи answer",
          "frame": "main"
        },
        {
          "address": 4064,
          "size": 8,
          "value": 4096,
          "label": "Сохранённый RBP",
          "frame": "_Z3addii"
        },
        {
          "address": 4060,
          "size": 4,
          "value": 40,
          "label": "a (копия аргумента)",
          "frame": "_Z3addii"
        },
        {
          "address": 4056,
          "size": 4,
          "value": 2,
          "label": "b (копия аргумента)",
          "frame": "_Z3addii"
        },
        {
          "address": 4052,
          "size": 4,
          "value": 42,
          "label": "result",
          "frame": "_Z3addii"
        }
      ],
      "message": "pop rbp восстанавливает RBP вызывающей функции и увеличивает RSP на 8.",
      "changedRegisters": [
        "rbp",
        "rsp"
      ],
      "changedSlots": []
    },
    {
      "function": "main",
      "pc": 9,
      "executed": {
        "function": "_Z3addii",
        "pc": 11,
        "instruction": "ret"
      },
      "registers": {
        "rsp": 4080,
        "rbp": 4096,
        "rax": 42,
        "rdi": 40,
        "rsi": 2
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "caller"
        },
        {
          "address": 4096,
          "size": 8,
          "value": 4224,
          "label": "Сохранённый RBP",
          "frame": "main"
        },
        {
          "address": 4092,
          "size": 4,
          "value": 0,
          "label": "Служебный слот Clang",
          "frame": "main"
        },
        {
          "address": 4088,
          "size": 4,
          "value": 40,
          "label": "a",
          "frame": "main"
        },
        {
          "address": 4084,
          "size": 4,
          "value": 2,
          "label": "b",
          "frame": "main"
        },
        {
          "address": 4080,
          "size": 4,
          "value": null,
          "label": "answer",
          "frame": "main"
        },
        {
          "address": 4072,
          "size": 8,
          "value": "main:9",
          "label": "Возврат к записи answer",
          "frame": "main"
        },
        {
          "address": 4064,
          "size": 8,
          "value": 4096,
          "label": "Сохранённый RBP",
          "frame": "_Z3addii"
        },
        {
          "address": 4060,
          "size": 4,
          "value": 40,
          "label": "a (копия аргумента)",
          "frame": "_Z3addii"
        },
        {
          "address": 4056,
          "size": 4,
          "value": 2,
          "label": "b (копия аргумента)",
          "frame": "_Z3addii"
        },
        {
          "address": 4052,
          "size": 4,
          "value": 42,
          "label": "result",
          "frame": "_Z3addii"
        }
      ],
      "message": "ret забирает адрес возврата из стека. Следующая инструкция main запишет EAX = 42 в answer.",
      "changedRegisters": [
        "rsp"
      ],
      "changedSlots": []
    },
    {
      "function": "main",
      "pc": 10,
      "executed": {
        "function": "main",
        "pc": 9,
        "instruction": "mov dword ptr [rbp - 16], eax"
      },
      "registers": {
        "rsp": 4080,
        "rbp": 4096,
        "rax": 42,
        "rdi": 40,
        "rsi": 2
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "caller"
        },
        {
          "address": 4096,
          "size": 8,
          "value": 4224,
          "label": "Сохранённый RBP",
          "frame": "main"
        },
        {
          "address": 4092,
          "size": 4,
          "value": 0,
          "label": "Служебный слот Clang",
          "frame": "main"
        },
        {
          "address": 4088,
          "size": 4,
          "value": 40,
          "label": "a",
          "frame": "main"
        },
        {
          "address": 4084,
          "size": 4,
          "value": 2,
          "label": "b",
          "frame": "main"
        },
        {
          "address": 4080,
          "size": 4,
          "value": 42,
          "label": "answer",
          "frame": "main"
        },
        {
          "address": 4072,
          "size": 8,
          "value": "main:9",
          "label": "Возврат к записи answer",
          "frame": "main"
        },
        {
          "address": 4064,
          "size": 8,
          "value": 4096,
          "label": "Сохранённый RBP",
          "frame": "_Z3addii"
        },
        {
          "address": 4060,
          "size": 4,
          "value": 40,
          "label": "a (копия аргумента)",
          "frame": "_Z3addii"
        },
        {
          "address": 4056,
          "size": 4,
          "value": 2,
          "label": "b (копия аргумента)",
          "frame": "_Z3addii"
        },
        {
          "address": 4052,
          "size": 4,
          "value": 42,
          "label": "result",
          "frame": "_Z3addii"
        }
      ],
      "message": "В слот «answer» записано 42. Это 4 байта, потому что здесь хранится int.",
      "changedRegisters": [],
      "changedSlots": [
        4080
      ]
    },
    {
      "function": "main",
      "pc": 11,
      "executed": {
        "function": "main",
        "pc": 10,
        "instruction": "mov eax, dword ptr [rbp - 16]"
      },
      "registers": {
        "rsp": 4080,
        "rbp": 4096,
        "rax": 42,
        "rdi": 40,
        "rsi": 2
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "caller"
        },
        {
          "address": 4096,
          "size": 8,
          "value": 4224,
          "label": "Сохранённый RBP",
          "frame": "main"
        },
        {
          "address": 4092,
          "size": 4,
          "value": 0,
          "label": "Служебный слот Clang",
          "frame": "main"
        },
        {
          "address": 4088,
          "size": 4,
          "value": 40,
          "label": "a",
          "frame": "main"
        },
        {
          "address": 4084,
          "size": 4,
          "value": 2,
          "label": "b",
          "frame": "main"
        },
        {
          "address": 4080,
          "size": 4,
          "value": 42,
          "label": "answer",
          "frame": "main"
        },
        {
          "address": 4072,
          "size": 8,
          "value": "main:9",
          "label": "Возврат к записи answer",
          "frame": "main"
        },
        {
          "address": 4064,
          "size": 8,
          "value": 4096,
          "label": "Сохранённый RBP",
          "frame": "_Z3addii"
        },
        {
          "address": 4060,
          "size": 4,
          "value": 40,
          "label": "a (копия аргумента)",
          "frame": "_Z3addii"
        },
        {
          "address": 4056,
          "size": 4,
          "value": 2,
          "label": "b (копия аргумента)",
          "frame": "_Z3addii"
        },
        {
          "address": 4052,
          "size": 4,
          "value": 42,
          "label": "result",
          "frame": "_Z3addii"
        }
      ],
      "message": "EAX получает 42. Запись в EAX обнуляет старшие 32 бита RAX.",
      "changedRegisters": [
        "rax"
      ],
      "changedSlots": []
    },
    {
      "function": "main",
      "pc": 12,
      "executed": {
        "function": "main",
        "pc": 11,
        "instruction": "add rsp, 16"
      },
      "registers": {
        "rsp": 4096,
        "rbp": 4096,
        "rax": 42,
        "rdi": 40,
        "rsi": 2
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "caller"
        },
        {
          "address": 4096,
          "size": 8,
          "value": 4224,
          "label": "Сохранённый RBP",
          "frame": "main"
        },
        {
          "address": 4092,
          "size": 4,
          "value": 0,
          "label": "Служебный слот Clang",
          "frame": "main"
        },
        {
          "address": 4088,
          "size": 4,
          "value": 40,
          "label": "a",
          "frame": "main"
        },
        {
          "address": 4084,
          "size": 4,
          "value": 2,
          "label": "b",
          "frame": "main"
        },
        {
          "address": 4080,
          "size": 4,
          "value": 42,
          "label": "answer",
          "frame": "main"
        },
        {
          "address": 4072,
          "size": 8,
          "value": "main:9",
          "label": "Возврат к записи answer",
          "frame": "main"
        },
        {
          "address": 4064,
          "size": 8,
          "value": 4096,
          "label": "Сохранённый RBP",
          "frame": "_Z3addii"
        },
        {
          "address": 4060,
          "size": 4,
          "value": 40,
          "label": "a (копия аргумента)",
          "frame": "_Z3addii"
        },
        {
          "address": 4056,
          "size": 4,
          "value": 2,
          "label": "b (копия аргумента)",
          "frame": "_Z3addii"
        },
        {
          "address": 4052,
          "size": 4,
          "value": 42,
          "label": "result",
          "frame": "_Z3addii"
        }
      ],
      "message": "RSP увеличился на 16: локальная область кадра освобождена. Байты не обязаны стираться; серые ячейки уже вне активного стека.",
      "changedRegisters": [
        "rsp"
      ],
      "changedSlots": []
    },
    {
      "function": "main",
      "pc": 13,
      "executed": {
        "function": "main",
        "pc": 12,
        "instruction": "pop rbp"
      },
      "registers": {
        "rsp": 4104,
        "rbp": 4224,
        "rax": 42,
        "rdi": 40,
        "rsi": 2
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "caller"
        },
        {
          "address": 4096,
          "size": 8,
          "value": 4224,
          "label": "Сохранённый RBP",
          "frame": "main"
        },
        {
          "address": 4092,
          "size": 4,
          "value": 0,
          "label": "Служебный слот Clang",
          "frame": "main"
        },
        {
          "address": 4088,
          "size": 4,
          "value": 40,
          "label": "a",
          "frame": "main"
        },
        {
          "address": 4084,
          "size": 4,
          "value": 2,
          "label": "b",
          "frame": "main"
        },
        {
          "address": 4080,
          "size": 4,
          "value": 42,
          "label": "answer",
          "frame": "main"
        },
        {
          "address": 4072,
          "size": 8,
          "value": "main:9",
          "label": "Возврат к записи answer",
          "frame": "main"
        },
        {
          "address": 4064,
          "size": 8,
          "value": 4096,
          "label": "Сохранённый RBP",
          "frame": "_Z3addii"
        },
        {
          "address": 4060,
          "size": 4,
          "value": 40,
          "label": "a (копия аргумента)",
          "frame": "_Z3addii"
        },
        {
          "address": 4056,
          "size": 4,
          "value": 2,
          "label": "b (копия аргумента)",
          "frame": "_Z3addii"
        },
        {
          "address": 4052,
          "size": 4,
          "value": 42,
          "label": "result",
          "frame": "_Z3addii"
        }
      ],
      "message": "pop rbp восстанавливает RBP вызывающей функции и увеличивает RSP на 8.",
      "changedRegisters": [
        "rbp",
        "rsp"
      ],
      "changedSlots": []
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
        "rsi": 2
      },
      "slots": [
        {
          "address": 4104,
          "size": 8,
          "value": "вызывающий код",
          "label": "Адрес возврата из main",
          "frame": "caller"
        },
        {
          "address": 4096,
          "size": 8,
          "value": 4224,
          "label": "Сохранённый RBP",
          "frame": "main"
        },
        {
          "address": 4092,
          "size": 4,
          "value": 0,
          "label": "Служебный слот Clang",
          "frame": "main"
        },
        {
          "address": 4088,
          "size": 4,
          "value": 40,
          "label": "a",
          "frame": "main"
        },
        {
          "address": 4084,
          "size": 4,
          "value": 2,
          "label": "b",
          "frame": "main"
        },
        {
          "address": 4080,
          "size": 4,
          "value": 42,
          "label": "answer",
          "frame": "main"
        },
        {
          "address": 4072,
          "size": 8,
          "value": "main:9",
          "label": "Возврат к записи answer",
          "frame": "main"
        },
        {
          "address": 4064,
          "size": 8,
          "value": 4096,
          "label": "Сохранённый RBP",
          "frame": "_Z3addii"
        },
        {
          "address": 4060,
          "size": 4,
          "value": 40,
          "label": "a (копия аргумента)",
          "frame": "_Z3addii"
        },
        {
          "address": 4056,
          "size": 4,
          "value": 2,
          "label": "b (копия аргумента)",
          "frame": "_Z3addii"
        },
        {
          "address": 4052,
          "size": 4,
          "value": 42,
          "label": "result",
          "frame": "_Z3addii"
        }
      ],
      "message": "main вернула 42 вызывающему коду. RSP и RBP восстановлены; программа завершится с кодом 42.",
      "changedRegisters": [
        "rsp"
      ],
      "changedSlots": []
    }
  ],
  "compiler": "Homebrew clang version 21.1.1",
  "flags": [
    "--target=x86_64-unknown-linux-gnu",
    "-std=c++20",
    "-Wall",
    "-Wextra",
    "-pedantic",
    "-O0",
    "-fno-omit-frame-pointer",
    "-fno-stack-protector",
    "-fno-asynchronous-unwind-tables",
    "-mno-red-zone",
    "-masm=intel"
  ]
};
