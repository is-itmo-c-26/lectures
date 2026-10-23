---
title: "Лекция 7. Компилятор и препроцессор"
---

::: {.content-visible unless-format="revealjs"}

[Открыть слайды](../slides/lectures/07-compiler-preprocessor.html){.btn .btn-outline-primary target="_blank"}

:::

## План лекции

- Программы состоят из файлов
- Этапы трансляции
- Объявление и определение, заголовочные файлы
- Препроцессор: `#include`, макросы, условная компиляция, стражи
- Компилятор и объектные файлы
- Компоновщик/линковщик и ошибки компоновки
- Linkage и storage duration

## 1. Программы состоят из файлов

- Логическое разбиение на модули
- Повторное использование кода
- Ускорение сборки: пересобираются только изменённые файлы
- Небольшие файлы проще читать и редактировать

Файлы бывают двух видов:

- заголовочные — `*.h`, `*.hpp`
- с исходным кодом — `*.cpp`

## 2. Этапы трансляции

::: {.code-swap}

::: {.fragment .fade-out data-fragment-index="0"}

![Каждый `.cpp` проходит препроцессор, компилятор и ассемблер; компоновщик собирает объектные файлы в программу](../assets/07-compiler-preprocessor/translation-stages-diagram.png)

:::

::: {.fragment .fade-in data-fragment-index="0"}

::: {.small-table}

| Фаза | Что происходит | Этап |
|--|----------------------------------|------|
| 1 | Символы файла приводятся к набору символов трансляции, концы строк — к `\n` | препроцессор |
| 2 | Пары «`\` + перевод строки» удаляются: физические строки склеиваются в логические | препроцессор |
| 3 | Текст разбивается на токены препроцессора, каждый комментарий заменяется пробелом | препроцессор |
| 4 | Выполняются директивы, раскрываются макросы; `#include` прогоняет файл через фазы 1–4 | препроцессор |
| 5 | Символы и escape-последовательности в литералах переводятся в кодировку исполнения | компилятор |
| 6 | Соседние строковые литералы склеиваются: `"Hello, " "world"` | компилятор |
| 7 | Токены анализируются и переводятся как единица трансляции | компилятор |
| 8 | Инстанцируются шаблоны | компилятор |
| 9 | Разрешаются ссылки между единицами трансляции, подключаются библиотеки | компоновщик |

:::

:::

:::

Стандарт описывает девять фаз трансляции. Препроцессор, компилятор и компоновщик — их крупные группы.

::: {.notes}
Список фаз — по C++20, [lex.phases]; подробнее — [cppreference](https://en.cppreference.com/w/cpp/language/translation_phases). В C++23 фазы 5 и 6 сформулированы иначе, суть та же. Шаблоны из фазы 8 будут в одной из следующих лекций.
:::

## Этапы по отдельности

| Команда | Что выполняется | Результат |
|---|---|---|
| `clang++ -E main.cpp` | препроцессор | текст после препроцессора — в консоль |
| `clang++ -S main.cpp` | препроцессор и компиляция | ассемблер `main.s` |
| `clang++ -c main.cpp` | всё это и ассемблирование | объектный файл `main.o` |
| `clang++ main.o math.o` | компоновка | исполняемый файл `a.out` |

Компоновщик отдельно запускать не нужно: `clang++` вызывает его сам. Флаг `-Xlinker <arg>` передаёт ему следующий аргумент, например `-Xlinker -v`.

::: {.notes}
Живой код: собрать пример `separate-compilation` по шагам. `clang++ -E main.cpp -o main.ii` даёт файл в 3,6 МБ — почти всё это `<iostream>`.
:::

## 3. Объявление и определение

- **Объявление** (declaration) задаёт имя и атрибуты сущности, например сигнатуру функции. Повторять его можно сколько угодно раз
- **Определение** (definition) задаёт сущность полностью и одновременно является объявлением

```cpp
int Add(int a, int b);  // объявление

int Add(int a, int b) {  // определение
    return a + b;
}
```

## Определение в другом файле

:::: {.columns}

::: {.column width="40%"}

```{.cpp filename="math.cpp"}
{{< include ../examples/07-compiler-preprocessor/declaration/math.cpp >}}
```

:::

::: {.column width="60%"}

```{.cpp filename="main.cpp"}
{{< include ../examples/07-compiler-preprocessor/declaration/main.cpp >}}
```

:::

::::

Собираем оба файла: `clang++ main.cpp math.cpp`. Чтобы скомпилировать вызов в `main.cpp`, хватает объявления. Определение найдёт компоновщик.

## Заголовочный файл

Что кладут в заголовок:

- объявления функций
- объявления переменных: `extern int total;`
- определения типов: `struct`, `enum`
- константы

Определения обычных функций и переменных в заголовок класть нельзя. Заголовок подключают в несколько `.cpp`, и определение повторится — что из этого выйдет, увидим в разделе про компоновщик.

## Заголовочные файлы {.compact-code}

:::: {.columns}

::: {.column width="30%"}

```{.cpp filename="math.hpp"}
{{< include ../examples/07-compiler-preprocessor/separate-compilation/math.hpp >}}
```

:::

::: {.column width="32%"}

```{.cpp filename="math.cpp"}
{{< include ../examples/07-compiler-preprocessor/separate-compilation/math.cpp >}}
```

:::

::: {.column width="38%"}

```{.cpp filename="main.cpp"}
{{< include ../examples/07-compiler-preprocessor/separate-compilation/main.cpp >}}
```

:::

::::

Объявления записаны один раз в `math.hpp`, а подключают его и `math.cpp`, и `main.cpp`. Строка `#pragma once` — защита от повторного включения, о ней ниже.

## 4. Препроцессор

- Препроцессор — отдельный язык, встроенный в C и C++. Он обрабатывает текст программы до компилятора и не знает синтаксиса C++
- Его команды называют директивами, все они начинаются с `#`
- Директива `#include "math.hpp"` заменяется содержимым файла `math.hpp`

## Директивы препроцессора

- Макросы: `#define`, `#undef`
- Предопределённые макросы: `__FILE__`, `__LINE__`
- Операторы макросов: `#` и `##`
- Условное включение: `#if`, `#ifdef`, `#ifndef`, `#elif`, `#else`, `#endif`
- Подключение файлов: `#include <filename>` ищет в системных каталогах, `#include "filename"` — сначала рядом с текущим файлом
- Другие директивы: `#pragma once` — о нём ниже, в разделе про стражи; `#error`
- `#pragma pack` управляет выравниванием полей структуры — его мы разбирали в лекции 4

## Что делает `#include`

![Препроцессор вставляет текст `math.hpp` на место директивы `#include`](../assets/07-compiler-preprocessor/include-diagram.png)

Получившийся текст — `.cpp` со всеми подключёнными заголовками — называют **единицей трансляции**. Её и получает компилятор.

## Смотрим через `clang++ -E` {.compact-code}

```cpp
// … 83 тысячи строк из <iostream> …
# 2 "main.cpp" 2

# 1 "./math.hpp" 1


void Increment(int& value);
int Add(int a, int b);
# 4 "main.cpp" 2

int main() {
    int x = 1;
    int y = 2;

    Increment(y);
    std::cout << Add(x, y) << '\n';

    return 0;
}
```

Строки вида `# 4 "main.cpp" 2` — пометки для компилятора: из какого файла и с какой строки пришёл текст. По ним он показывает место ошибки.

## Макросы

- `#define` задаёт имя, которое препроцессор заменит текстом
- Макрос с параметрами похож на функцию, но это подстановка текста: про типы и синтаксис C++ препроцессор ничего не знает

```{.cpp filename="macro-max.cpp"}
{{< include ../examples/07-compiler-preprocessor/macro-max.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-07-macro-max]{aria-label="Open in Compiler Explorer"}

## Макрос после препроцессора

```cpp
int main() {
    std::cout << ((10) > (20) ? (10) : (20)) << '\n';

    return 0;
}
```

Так выглядит конец вывода `clang++ -E macro-max.cpp`. Скобки вокруг параметров обязательны: подстановка текстовая, и без них аргумент вроде `a + 1` смешался бы с соседними операторами.

## Что напечатает `MAXIMUM(i++, j++)`?

```{.cpp filename="macro-double-evaluation.cpp"}
{{< include ../examples/07-compiler-preprocessor/macro-double-evaluation.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-07-macro-double-evaluation]{aria-label="Open in Compiler Explorer"}

::: {.fragment}

**3 2 4.** Макрос раскрывается в `((i++) > (j++) ? (i++) : (j++))`, и `j++` выполняется дважды. Обычная функция `int Maximum(int x, int y)` вычислила бы каждый аргумент один раз — и заодно проверила бы типы.

:::

## Препроцессор не знает C++

```cpp
#include <cmath>
#include <cstdio>

#define log(level, message) std::printf("[%s] %s\n", level, message)

int main() {
    log("INFO", "start");
    double x = std::log(2.718);  // ?
    return x > 0 ? 0 : 1;
}
```

::: {.fragment}

`error: too few arguments provided to function-like macro invocation`. Препроцессор видит `log(2.718)` и раскрывает свой макрос — пространство имён `std` для него ничего не значит. Поэтому имена макросов пишут `ЗАГЛАВНЫМИ_БУКВАМИ`, а сами макросы используют только там, где функция не справится.

:::

::: {.notes}
Пример намеренно не компилируется.
:::

## Условная компиляция {.compact-code}

```{.cpp filename="conditional-log.cpp"}
{{< include ../examples/07-compiler-preprocessor/conditional-log.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-07-conditional-log]{aria-label="Open in Compiler Explorer"}

С флагом `-DDEBUG` программа напечатает `[ERROR] (conditional-log.cpp:12) fatal error no: 1`, без него макрос раскроется в пустоту. `__VA_OPT__(, )` из C++20 ставит запятую, только если переданы дополнительные аргументы.

::: {.notes}
В старом коде встречается `, ##__VA_ARGS__` — это расширение GNU, с `-pedantic` clang на него предупреждает. Имена с двумя подчёркиваниями вроде `__DEBUG__` зарезервированы за компилятором и стандартной библиотекой: используйте `DEBUG` или стандартный `NDEBUG`.
:::

## Двойное включение {.compact-code}

:::: {.columns}

::: {.column width="56%"}

![](../assets/07-compiler-preprocessor/include-guard-diagram.png){fig-alt="main.cpp подключает point.hpp дважды: напрямую и через shape.hpp"}

:::

::: {.column width="44%"}

```{.cpp filename="main.cpp"}
{{< include ../examples/07-compiler-preprocessor/double-include/main.cpp >}}
```

```{.cpp filename="shape.hpp"}
{{< include ../examples/07-compiler-preprocessor/double-include/shape.hpp >}}
```

```{.cpp filename="point.hpp"}
{{< include ../examples/07-compiler-preprocessor/double-include/point.hpp >}}
```

:::

::::

`struct Point` попадает в единицу трансляции дважды: `error: redefinition of 'Point'`. Clang подсказывает: `unguarded header; consider using #ifdef guards or #pragma once`.

::: {.notes}
Пример намеренно не компилируется. Живой код: `clang++ -c main.cpp` в `examples/07-compiler-preprocessor/double-include`, затем добавить `#pragma once` в `point.hpp` и собрать снова.
:::

## Стражи включения

:::: {.columns}

::: {.column width="50%"}

```cpp
#ifndef POINT_HPP
#define POINT_HPP

struct Point {
    int x;
    int y;
};

#endif
```

:::

::: {.column width="50%"}

```cpp
#pragma once

struct Point {
    int x;
    int y;
};
```

:::

::::

При втором включении `POINT_HPP` уже определён, и препроцессор пропускает текст до `#endif`. `#pragma once` делает то же короче. Его нет в стандарте, но поддерживают все основные компиляторы.

## 5. Компилятор

- Получает единицу трансляции — `.cpp` после препроцессора
- Каждый `.cpp` компилируется отдельно и независимо от остальных
- Заголовочные файлы сами по себе не компилируются — только в составе `.cpp`, которые их подключают
- Переводит её в текст на языке ассемблера (`.s`), а ассемблер — в объектный файл (`.o`, `.obj`) с машинным кодом

## Что выдаёт компилятор

```{.nasm filename="increment-x86-64.asm"}
{{< include ../examples/07-compiler-preprocessor/separate-compilation/increment-x86-64.asm >}}
```

`clang++ -S -masm=intel math.cpp`, x86-64, `-O0`; комментарии добавлены вручную. Функция называется `_Z9IncrementRi`: компилятор кодирует в имени типы параметров (name mangling). Так перегрузки из лекции 6 получают разные имена.

## Зачем нужно ассемблирование

- Компилятор выдаёт текст — мнемоники вроде `push`, `mov`, `call`. Процессор исполняет не текст, а байты
- Ассемблер кодирует каждую команду в байты машинного кода и собирает объектный файл:
  - секции: код (`.text`) и данные (`.data`, `.rodata`)
  - таблицу символов: что определено в файле, а что нужно извне
  - перемещения (relocations): места, куда компоновщик впишет адреса
- Отдельный шаг удобен: компилятору не нужно знать двоичное кодирование команд, а ассемблер так же обрабатывает код, написанный на ассемблере вручную
- Clang по умолчанию ассемблирует сам, встроенным ассемблером: `clang++ -c` сразу выдаёт `.o`. GCC вызывает отдельную программу `as`

## Что внутри объектного файла

```
$ objdump -dr --x86-asm-syntax=intel main.o
…
  1d: 48 8d 7d f4       lea   rdi, [rbp - 12]
  21: e8 00 00 00 00    call  …
            X86_64_RELOC_BRANCH  __Z9IncrementRi
  26: 8b 7d f8          mov   edi, dword ptr [rbp - 8]
  29: 8b 75 f4          mov   esi, dword ptr [rbp - 12]
  2c: e8 00 00 00 00    call  …
            X86_64_RELOC_BRANCH  __Z3Addii
…
```

Слева — байты машинного кода, справа — те же команды текстом. На месте адресов `Increment` и `Add` стоят нули: функции определены в другом файле, и их адреса ассемблеру неизвестны. Пометки `X86_64_RELOC_BRANCH` говорят компоновщику, куда вписать адрес.

::: {.notes}
Снято командами `clang++ --target=x86_64-apple-macos13 -c main.cpp` и `objdump -dr --x86-asm-syntax=intel main.o` для примера `separate-compilation`. На Linux та же пометка выглядит как `R_X86_64_PLT32 _Z9IncrementRi-0x4`.
:::

## Символы объектного файла

```{=html}
<pre class="nm-output"><code>$ nm main.o | c++filt
                 <span class="nm-undefined">U</span> Add(int, int)
                 <span class="nm-undefined">U</span> Increment(int&amp;)
0000000000000000 <span class="nm-text">T</span> _main
                 … и ещё около 60 символов из &lt;iostream&gt;

$ nm math.o | c++filt
0000000000000020 <span class="nm-text">T</span> Add(int, int)
0000000000000000 <span class="nm-text">T</span> Increment(int&amp;)</code></pre>
```

- [U]{.nm-undefined} — **undefined**: символ используется, но в этом файле не определён
- [T]{.nm-text} — **text**: символ определён в секции кода `.text`

Заглавная буква значит, что символ виден другим файлам (external linkage), строчная — что он локальный: у `static`-функции будет `t`. Без `c++filt` видны декорированные имена: `_Z3Addii`.

::: {.notes}
Вывод снят на macOS: там к именам добавляется ещё одно подчёркивание — `_main`, `__Z3Addii`. На Linux будут `main` и `_Z3Addii`.
:::

## 6. Компоновщик/линковщик

- Объединяет объектные файлы и библиотеки в исполняемый файл или библиотеку
- Связывает каждый неопределённый символ (`U`) с его определением (`T`) в другом файле
- Подставляет адреса функций и переменных в места их использования

## Как компоновщик связывает файлы

![Компоновщик находит в `math.o` определения символов, которых не хватает `main.o`](../assets/07-compiler-preprocessor/linker-symbols-diagram.png)

## Собираем по шагам

```
$ clang++ -std=c++20 -c main.cpp     # main.o
$ clang++ -std=c++20 -c math.cpp     # math.o
$ clang++ main.o math.o -o program   # компоновка
$ ./program
4
```

Если изменился только `math.cpp`, достаточно пересобрать `math.o` и заново скомпоновать программу: `main.o` можно не трогать. Так сборочные системы вроде CMake экономят время.

## Ошибки компиляции и компоновки

- **Ошибка компиляции** — проблема внутри одной единицы трансляции: синтаксис, типы, необъявленное имя. Например, вызов `Add` без объявления: `error: use of undeclared identifier 'Add'`
- **Ошибка компоновки** — каждая единица трансляции скомпилировалась, но символы не сошлись. Такое сообщение пишет уже компоновщик `ld`

## Объявили, но не определили

```cpp
int Add(int a, int b);

int main() {
    return Add(1, 2);
}
```

```
Undefined symbols for architecture arm64:
  "Add(int, int)", referenced from:
      _main in main.o
ld: symbol(s) not found for architecture arm64
```

Компилятору хватило объявления, а определения не нашёл компоновщик. На Linux то же самое звучит как `undefined reference to 'Add(int, int)'`.

## Определили в заголовке

```{.cpp filename="shared.hpp"}
#pragma once

int shared = 239;  // определение, а не объявление
```

Подключаем `shared.hpp` в `main.cpp` и `a.cpp`:

```
duplicate symbol '_shared' in:
    a.o
    main.o
ld: 1 duplicate symbols
```

`#pragma once` не спасает: он защищает от повторного включения в одну единицу трансляции, а их здесь две. Но почему тогда константу `const int kAnswer = 239;` держать в заголовке можно? Ответ — в linkage.

::: {.notes}
На Linux компоновщик пишет `multiple definition of 'shared'`.
:::

## 7. Linkage

- **External** — имя доступно из всех единиц трансляции
- **Internal** — только из своей единицы трансляции: `static` на уровне файла, `const`-переменные, безымянное пространство имён из лекции 6
- **No linkage** — только в своей области видимости: локальные переменные

## Пример: `math.hpp`

```{.cpp filename="math.hpp"}
{{< include ../examples/07-compiler-preprocessor/linkage/math.hpp >}}
```

## Пример: `math.cpp`

```{.cpp filename="math.cpp"}
{{< include ../examples/07-compiler-preprocessor/linkage/math.cpp >}}
```

## Пример: `main.cpp` {.compact-code .tall-code}

```{.cpp filename="main.cpp"}
{{< include ../examples/07-compiler-preprocessor/linkage/main.cpp >}}
```

`const float kE` в `main.cpp` видит объявление `extern` из заголовка и поэтому получает external linkage.

## Какие адреса совпадут?

Собираем `clang++ main.cpp math.cpp` и запускаем.

::: {.fragment}

```
kPi     3.14 0x1041efea8
kE      2.72 0x1041efea4
kAnswer 239 0x1041efeac
counter 3 0x1041f4004
total   2 0x1041f4000
--- PrintInfo() из math.cpp ---
kPi     3.14 0x1041efeb0
kE      2.72 0x1041efea4
kAnswer 239 0x1041efeb4
counter 0 0x1041f4008
total   2 0x1041f4000
```

:::

::: {.fragment}

Совпали только `kE` и `total` — это один объект на всю программу. У `kPi`, `kAnswer` и `counter` в каждой единице трансляции своя копия, поэтому `counter = 3` из `main` в `math.cpp` не видно.

:::

::: {.notes}
Константы лежат рядом (`0x…efe…`, rodata), изменяемые переменные — в другой области (`0x…f4…`, data), как в карте памяти из лекции 5. Адреса сняты на macOS (arm64) и меняются от запуска к запуску.
:::

## Linkage в картинке

![Internal linkage — своя копия в каждой единице трансляции, external — один объект на всю программу](../assets/07-compiler-preprocessor/linkage-diagram.png)

## Правило одного определения

Теперь понятно, почему `int shared = 239;` в заголовке ломает сборку, а `const int kAnswer = 239;` — нет. У `kAnswer` internal linkage: в каждой единице трансляции своя копия. У `shared` — external: это один объект на всю программу, а определений два.

**Правило одного определения** (ODR): у функции или переменной с external linkage во всей программе ровно одно определение, а объявлений — сколько угодно.

:::: {.columns}

::: {.column width="42%"}

```{.cpp filename="shared.hpp"}
#pragma once

extern int shared;  // объявление
```

:::

::: {.column width="58%"}

```{.cpp filename="a.cpp"}
#include "shared.hpp"

int shared = 239;  // единственное определение
```

:::

::::

## Storage duration

`static` отвечает не только за linkage, но и за время жизни объекта:

- **automatic** — локальные переменные, живут до конца блока
- **static** — глобальные и `static`-переменные, живут от запуска программы до её завершения
- **thread** — `thread_local`-переменные, живут, пока жив поток
- **dynamic** — объекты из `new`, живут до `delete`

Это те же области памяти, что в лекции 5: стек, data и bss, куча.

## Спецификаторы класса памяти

- `static` на уровне пространства имён — static storage duration и internal linkage
- `static` у локальной переменной — static storage duration без linkage
- `extern` — объявление имени с external linkage
- `thread_local` — thread storage duration
- `mutable` — разрешает менять поле `const`-объекта

[godbolt-07-macro-max]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%0A%23define+MAXIMUM(x,+y)+((x)+%3E+(y)+%3F+(x)+:+(y))%0A%0Aint+main()+%7B%0A++++std::cout+%3C%3C+MAXIMUM(10,+20)+%3C%3C+!'%5Cn!'%3B%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/07-compiler-preprocessor/macro-max.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-07-macro-double-evaluation]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%0A%23define+MAXIMUM(x,+y)+((x)+%3E+(y)+%3F+(x)+:+(y))%0A%0Aint+main()+%7B%0A++++int+i+%3D+1%3B%0A++++int+j+%3D+2%3B%0A++++int+m+%3D+MAXIMUM(i%2B%2B,+j%2B%2B)%3B%0A%0A++++std::cout+%3C%3C+m+%3C%3C+!'+!'+%3C%3C+i+%3C%3C+!'+!'+%3C%3C+j+%3C%3C+!'%5Cn!'%3B%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/07-compiler-preprocessor/macro-double-evaluation.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-07-conditional-log]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ccstdio%3E%0A%0A%23ifdef+DEBUG%0A%23define+ERROR_LOG(format,+...)++++++++++++++++++++++%5C%0A++++std::printf(%22%5BERROR%5D+(%25s:%25d)+%22+format+%22%5Cn%22,+++++%5C%0A++++++++++++++++__FILE__,+__LINE__+__VA_OPT__(,+)+__VA_ARGS__)%0A%23else%0A%23define+ERROR_LOG(format,+...)%0A%23endif%0A%0Aint+main()+%7B%0A++++ERROR_LOG(%22fatal+error+no:+%25d%22,+1)%3B%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0+-DDEBUG',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/07-compiler-preprocessor/conditional-log.cpp" compiler="clang2310" options="-std=c++20 -O0 -DDEBUG" -->
