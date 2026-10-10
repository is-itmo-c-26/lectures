---
title: "Лекция 2. Выражения, управление потоком и функции"
---

::: {.content-visible unless-format="revealjs"}

[Открыть слайды](../slides/lectures/02-expressions-control-flow-functions.html){.btn .btn-outline-primary target="_blank"}

:::

## План лекции

- Выражения, инструкции и блоки
- Ветвления и циклы
- Функции и рекурсия
- Области видимости и сокрытие имён

## Выражения, инструкции и блоки


**[Выражение (expression)][cppref-expressions]** задаёт вычисление: например, `a + b` вычисляет сумму, а `i++` ещё и изменяет переменную. Выражение может давать значение; у выражения типа [`void`][cppref-types-void] значения нет.

**[Инструкция (statement)][cppref-statements]** задаёт шаг выполнения программы: вычислить выражение, объявить переменную, выбрать ветвь или выполнить цикл.

Добавив `;` к выражению, получаем инструкцию-выражение:

```cpp
c = a + b;
i++;
```

Здесь `i++` — выражение, а `i++;` — инструкция. Не каждая инструкция является выражением: например, [`if`][cppref-if] и [`while`][cppref-while] управляют выполнением других инструкций.

Несколько инструкций можно объединить в [блок][cppref-statements]:

```cpp
{
    PrintMessage();
    ++message_count;
}
```

## Условный оператор [`if-else`][cppref-if]


```cpp
if (condition) {
    statement_when_true();
} else {
    statement_when_false();
}
```

- Ветвь [`else`][cppref-if] может отсутствовать
- Числовое значение `0` в условии означает [`false`][cppref-bool-literal], ненулевое — [`true`][cppref-bool-literal]
- На курсе всегда используем фигурные скобки

## К какому [`if`][cppref-if] относится [`else`][cppref-if]?

`outer_condition == false`. Что напечатает программа: `result = 0` или `result = 2`?

<!-- Намеренно без фигурных скобок: пример показывает, к какому if относится else. clang-tidy и -Wdangling-else предупреждают по замыслу. -->
```{.cpp filename="dangling-else.cpp" code-line-numbers="|8-12|14"}
{{< include ../examples/02-expressions-control-flow-functions/dangling-else.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-02-dangling-else]{aria-label="Open in Compiler Explorer"}

В примере фигурные скобки намеренно опущены.

## Фигурные скобки делают структуру явной

Покажем компилятору, что [`else`][cppref-if] относится к внешнему [`if`][cppref-if]:

```{.cpp filename="dangling-else-fixed.cpp" code-line-numbers="|8-14|16"}
{{< include ../examples/02-expressions-control-flow-functions/dangling-else-fixed.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-02-dangling-else-fixed]{aria-label="Open in Compiler Explorer"}

Теперь программа печатает `result = 2`, а структура не зависит от отступов.

## Цепочка [`else if`][cppref-if]


```cpp
if (score >= 90) {
    grade = 'A';
} else if (score >= 75) {
    grade = 'B';
} else if (score >= 60) {
    grade = 'C';
} else {
    grade = 'F';
}
```

Проверки выполняются сверху вниз до первой подходящей ветви.

## Цикл [`while`][cppref-while]


```cpp
int number = 5;

while (number > 0) {
    std::cout << number << '\n';
    --number;
}
```

Условие проверяется **до** каждой итерации. Цикл может не выполниться ни разу.

## Цикл [`do-while`][cppref-do]


```cpp
int number = 0;

do {
    std::cout << "Enter number (0 to end): ";
    std::cin >> number;
    std::cout << "You entered: " << number << '\n';
} while (number != 0);
```

Условие проверяется **после** итерации. Тело выполнится хотя бы один раз.

::: {.fragment}

Зачем может быть нужен такой код?

```cpp
do {
    // code
} while (false);
```

:::

::: {.fragment}

Чтобы можно было использовать `break` для выхода из блока кода в любом месте.

```cpp
do {
    if (!open_file()) break; // Выход из блока
    if (!alloc_memory()) break; // Выход из блока

    // Основная логика, если всё хорошо
    process_data();

} while (false);
```

:::

## Цикл [`for`][cppref-for]


```cpp
for (initialization; condition; step) {
    statement();
}
```

- `initialization` выполняется один раз
- `condition` проверяется перед каждой итерацией
- `step` выполняется после тела, в том числе при переходе через [`continue`][cppref-continue]

Эквивалентная схема через [`while`][cppref-while], если в теле нет [`continue`][cppref-continue]:

```{.cpp filename="while-equivalent.cpp"}
{{< include ../examples/02-expressions-control-flow-functions/while-equivalent.cpp >}}
```

Внешний блок сохраняет область видимости. При наличии [`continue`][cppref-continue] нужно выполнять `step` и перед ним.

::: {.notes}
Оба фрагмента — схемы, а не самостоятельные компилируемые программы: initialization, condition, step и statement обозначают части исходного цикла. При пустом условии for в while используется true. Правило о выполнении step перед continue относится только к continue этого цикла, а не вложенных циклов.
:::

## [`continue`][cppref-continue] в цикле [`for`][cppref-for]

```{.cpp filename="for-continue.cpp" code-line-numbers="|4|5-7|8"}
{{< include ../examples/02-expressions-control-flow-functions/for-continue.cpp >}}
```

Цикл печатает `0 2`: после [`continue`][cppref-continue] выполняется шаг `++i`.

Наивный [`while`][cppref-while] с `++i` в конце тела зациклится: при `i == 1` оператор [`continue`][cppref-continue] пропустит `++i`.

## Великая мудрость синтаксиса C++

```cpp
int i = 10;
for (; i --> 0;) {
    std::cout << i << ' ';
}
```

::: {.fragment}

`i --> 0` на самом деле читается как `i-- > 0`: постфиксный декремент и оператор `>`, а вместе они складываются в псевдо-оператор «идёт к» (`goes to`).

Вывод: `9 8 7 6 5 4 3 2 1 0`.

:::

## Примеры [`for`][cppref-for]


```cpp
for (int number = 10; number > 0; --number) {
    std::cout << number << ", ";
}

for (int left = 0, right = 100; left != right; ++left, --right) {
    std::cout << left << ", ";
}
```

Инициализация, условие и шаг собраны в заголовке цикла.

## [Range-based `for`][cppref-range-for]


```cpp
int values[] = {0, 1, 2, 3, 4, 5};

for (int value : values) {
    std::cout << value << ' ';
}
std::cout << '\n';
```

Цикл последовательно перебирает все элементы диапазона.

## Оператор [`break`][cppref-break]


```cpp
for (int number = 10; number > 0; --number) {
    if (number == 3) {
        std::cout << "countdown aborted!\n";
        break;
    }

    std::cout << number << ", ";
}
```

[`break`][cppref-break] немедленно завершает ближайший цикл или [`switch`][cppref-switch].

## Оператор [`continue`][cppref-continue]


```cpp
for (int number = 10; number > 0; --number) {
    if (number == 5) {
        continue;
    }

    std::cout << number << ", ";
}
```

[`continue`][cppref-continue] пропускает остаток текущей итерации.

## Оператор [`switch`][cppref-switch]


```cpp
switch (value) {
    case 1:
        handle_one();
        break;
    case 2:
        handle_two();
        break;
    default:
        handle_other();
        break;
}
```

## Как работает [`switch`][cppref-switch]


- Выражение должно иметь целочисленный или перечислимый тип
- Метки [`case`][cppref-switch] должны быть различными [константными выражениями][cppref-constant-expression]
- Выполнение начинается с совпавшей метки
- Если совпадения нет, управление переходит в [`default`][cppref-switch]
- [`break`][cppref-break] завершает [`switch`][cppref-switch]
- Без [`break`][cppref-break] выполнение переходит в следующую ветвь

## [`switch`][cppref-switch] и [`if-else`][cppref-if]


```cpp
switch (value) {
    case 1:
        std::cout << "value is 1\n";
        break;
    case 2:
        std::cout << "value is 2\n";
        break;
    default:
        std::cout << "unknown value\n";
        break;
}
```

[`switch`][cppref-switch] удобен, когда одно значение сравнивается с несколькими константами.

## Группировка ветвей [`switch`][cppref-switch]


```cpp
switch (value) {
    case 1:
    case 2:
    case 3:
        std::cout << "value is 1, 2 or 3\n";
        break;
    default:
        std::cout << "another value\n";
        break;
}
```

Несколько меток могут вести к одному блоку инструкций.

## [Функции][cppref-functions]


```cpp
return_type function_name(parameter_type parameter) {
    statements();
    return result;
}
```

- Параметры доступны внутри тела функции
- [`return`][cppref-return] завершает функцию и возвращает результат
- Выражение после [`return`][cppref-return] должно допускать [неявное преобразование][cppref-implicit-conversion] к возвращаемому типу функции

## Вызов функции


```{.cpp filename="addition-function.cpp"}
{{< include ../examples/02-expressions-control-flow-functions/addition-function.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-02-addition-function]{aria-label="Open in Compiler Explorer"}

## [Объявление и определение функции][cppref-function]


```{.cpp filename="function-declaration-definition.cpp"}
{{< include ../examples/02-expressions-control-flow-functions/function-declaration-definition.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-02-function-declaration]{aria-label="Open in Compiler Explorer"}

- Объявление сообщает сигнатуру функции
- Определение содержит тело функции



## Функция без возвращаемого значения


```{.cpp filename="void-function.cpp"}
{{< include ../examples/02-expressions-control-flow-functions/void-function.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-02-void-function]{aria-label="Open in Compiler Explorer"}

Тип [`void`][cppref-types-void] означает, что функция не возвращает значение.



## Функция [`main`][cppref-main-function]


Стандартные формы:

```cpp
int main() {
    // ...
}

int main(int argc, char* argv[]) {
    // ...
}
```

- Достижение конца [`main`][cppref-main-function] эквивалентно `return 0;`
- [`EXIT_SUCCESS`][cppref-utility-program-exit-status] и [`EXIT_FAILURE`][cppref-utility-program-exit-status] объявлены в [`<cstdlib>`][cppref-header-cstdlib]
- Дополнительные параметры [`main`][cppref-main-function] могут зависеть от реализации

## Аргументы командной строки


```{.cpp filename="command-line-arguments.cpp"}
{{< include ../examples/02-expressions-control-flow-functions/command-line-arguments.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-02-command-line-arguments]{aria-label="Open in Compiler Explorer"}

- `argc` — количество строк с аргументами в `argv`
- `argv` — массив указателей на строки с аргументами
- Если `argc > 0`, то `argv[0]` содержит имя запуска программы или пустую строку
- `argv[argc] == nullptr`



## Рекурсивная функция


```{.cpp filename="factorial-recursive.cpp"}
{{< include ../examples/02-expressions-control-flow-functions/factorial-recursive.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-02-factorial-recursive]{aria-label="Open in Compiler Explorer"}

Функция вызывает сама себя с меньшим аргументом. Условие `number == 0` останавливает рекурсию.



## Итеративная версия


```{.cpp filename="factorial-iterative.cpp"}
{{< include ../examples/02-expressions-control-flow-functions/factorial-iterative.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-02-factorial-iterative]{aria-label="Open in Compiler Explorer"}

Обе версии вычисляют одно значение, но цикл не создаёт цепочку рекурсивных вызовов.

Для достаточно большого `number` обе версии переполняют [`std::uint64_t`][cppref-integer]: поведение определено по модулю $2^N$, но результат перестаёт быть математическим факториалом.



## [Сокрытие имён (shadowing)][cppref-scope]


<!-- Глобальные изменяемые переменные оставлены намеренно: без них нечего скрывать. -->
```{.cpp filename="name-shadowing.cpp" code-line-numbers="|3-4|6-9|15-18|21"}
{{< include ../examples/02-expressions-control-flow-functions/name-shadowing.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-02-name-shadowing]{aria-label="Open in Compiler Explorer"}

Внутреннее объявление временно скрывает одноимённую переменную из внешней [области видимости][cppref-scope].

[godbolt-02-addition-function]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%0Aint+Addition(int+left,+int+right)+%7B%0A++++return+left+%2B+right%3B%0A%7D%0A%0Aint+main()+%7B%0A++++int+result+%3D+Addition(5,+3)%3B%0A++++std::cout+%3C%3C+result+%3C%3C+!'%5Cn!'%3B%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/02-expressions-control-flow-functions/addition-function.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-02-function-declaration]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%0Aint+Maximum(int+left,+int+right)%3B%0A%0Aint+main()+%7B%0A++++int+result+%3D+Maximum(10,+2)%3B%0A++++std::cout+%3C%3C+result+%3C%3C+!'%5Cn!'%3B%0A%0A++++return+0%3B%0A%7D%0A%0Aint+Maximum(int+left,+int+right)+%7B%0A++++return+left+%3E+right+%3F+left+:+right%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/02-expressions-control-flow-functions/function-declaration-definition.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-02-void-function]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%0Avoid+PrintMessage()+%7B%0A++++std::cout+%3C%3C+%22I!'m+a+function!!%5Cn%22%3B%0A%7D%0A%0Aint+main()+%7B%0A++++PrintMessage()%3B%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/02-expressions-control-flow-functions/void-function.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-02-command-line-arguments]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%0Aint+main(int+argc,+char*+argv%5B%5D)+%7B%0A++++for+(int+index+%3D+0%3B+index+%3C+argc%3B+%2B%2Bindex)+%7B%0A++++++++std::cout+%3C%3C+argv%5Bindex%5D+%3C%3C+!'%5Cn!'%3B%0A++++%7D%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/02-expressions-control-flow-functions/command-line-arguments.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-02-factorial-recursive]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ccstdint%3E%0A%23include+%3Ciostream%3E%0A%0Astd::uint64_t+Factorial(int+number)+%7B%0A++++if+(number+%3D%3D+0)+%7B%0A++++++++return+1%3B%0A++++%7D%0A%0A++++return+number+*+Factorial(number+-+1)%3B%0A%7D%0A%0Aint+main()+%7B%0A++++std::cout+%3C%3C+Factorial(5)+%3C%3C+!'%5Cn!'%3B%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/02-expressions-control-flow-functions/factorial-recursive.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-02-factorial-iterative]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ccstdint%3E%0A%23include+%3Ciostream%3E%0A%0Astd::uint64_t+Factorial(int+number)+%7B%0A++++std::uint64_t+result+%3D+1%3B%0A%0A++++for+(int+factor+%3D+2%3B+factor+%3C%3D+number%3B+%2B%2Bfactor)+%7B%0A++++++++result+*%3D+factor%3B%0A++++%7D%0A%0A++++return+result%3B%0A%7D%0A%0Aint+main()+%7B%0A++++std::cout+%3C%3C+Factorial(5)+%3C%3C+!'%5Cn!'%3B%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/02-expressions-control-flow-functions/factorial-iterative.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-02-name-shadowing]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%0Aint+x+%3D+0%3B%0Aint+y+%3D+0%3B%0A%0Avoid+PrintLocalValues(double+x)+%7B%0A++++double+y+%3D+3.14%3B%0A++++std::cout+%3C%3C+%22local:+x+%3D+%22+%3C%3C+x+%3C%3C+%22,+y+%3D+%22+%3C%3C+y+%3C%3C+!'%5Cn!'%3B%0A%7D%0A%0Aint+main()+%7B%0A++++x+%3D+21%3B%0A++++y+%3D+239%3B%0A%0A++++%7B%0A++++++++int+x+%3D+10%3B%0A++++++++std::cout+%3C%3C+%22block:+x+%3D+%22+%3C%3C+x+%3C%3C+%22,+y+%3D+%22+%3C%3C+y+%3C%3C+!'%5Cn!'%3B%0A++++++++PrintLocalValues(y)%3B%0A++++%7D%0A%0A++++std::cout+%3C%3C+%22global:+x+%3D+%22+%3C%3C+x+%3C%3C+%22,+y+%3D+%22+%3C%3C+y+%3C%3C+!'%5Cn!'%3B%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/02-expressions-control-flow-functions/name-shadowing.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-02-dangling-else]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%0Aint+main()+%7B%0A++++bool+outer_condition+%3D+false%3B%0A++++bool+inner_condition+%3D+false%3B%0A++++int+result+%3D+0%3B%0A%0A++++if+(outer_condition)%0A++++++++if+(inner_condition)%0A++++++++++++result+%3D+1%3B%0A++++else%0A++++++++result+%3D+2%3B%0A%0A++++std::cout+%3C%3C+%22result+%3D+%22+%3C%3C+result+%3C%3C+!'%5Cn!'%3B%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/02-expressions-control-flow-functions/dangling-else.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-02-dangling-else-fixed]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%0Aint+main()+%7B%0A++++bool+outer_condition+%3D+false%3B%0A++++bool+inner_condition+%3D+false%3B%0A++++int+result+%3D+0%3B%0A%0A++++if+(outer_condition)+%7B%0A++++++++if+(inner_condition)+%7B%0A++++++++++++result+%3D+1%3B%0A++++++++%7D%0A++++%7D+else+%7B%0A++++++++result+%3D+2%3B%0A++++%7D%0A%0A++++std::cout+%3C%3C+%22result+%3D+%22+%3C%3C+result+%3C%3C+!'%5Cn!'%3B%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/02-expressions-control-flow-functions/dangling-else-fixed.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[cppref-bool-literal]: https://en.cppreference.com/w/cpp/language/bool_literal.html

[cppref-break]: https://en.cppreference.com/w/cpp/language/break.html

[cppref-constant-expression]: https://en.cppreference.com/w/cpp/language/constant_expression.html

[cppref-continue]: https://en.cppreference.com/w/cpp/language/continue.html

[cppref-do]: https://en.cppreference.com/w/cpp/language/do.html

[cppref-for]: https://en.cppreference.com/w/cpp/language/for.html

[cppref-function]: https://en.cppreference.com/w/cpp/language/function.html

[cppref-functions]: https://en.cppreference.com/w/cpp/language/functions.html

[cppref-header-cstdlib]: https://en.cppreference.com/w/cpp/header/cstdlib.html

[cppref-if]: https://en.cppreference.com/w/cpp/language/if.html

[cppref-implicit-conversion]: https://en.cppreference.com/w/cpp/language/implicit_conversion.html

[cppref-main-function]: https://en.cppreference.com/w/cpp/language/main_function.html

[cppref-range-for]: https://en.cppreference.com/w/cpp/language/range-for.html

[cppref-return]: https://en.cppreference.com/w/cpp/language/return.html

[cppref-scope]: https://en.cppreference.com/w/cpp/language/scope.html

[cppref-switch]: https://en.cppreference.com/w/cpp/language/switch.html

[cppref-types-standard-integer-types]: https://en.cppreference.com/w/cpp/language/types.html#Standard_integer_types
[cppref-integer]: https://en.cppreference.com/w/cpp/types/integer.html

[cppref-types-void]: https://en.cppreference.com/w/cpp/language/types.html#void

[cppref-utility-program-exit-status]: https://en.cppreference.com/w/cpp/utility/program/EXIT_status.html

[cppref-while]: https://en.cppreference.com/w/cpp/language/while.html

[cppref-expressions]: https://en.cppreference.com/w/cpp/language/expressions.html

[cppref-statements]: https://en.cppreference.com/w/cpp/language/statements.html
