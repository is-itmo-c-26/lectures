---
title: "Лекция 1. Типы и операторы"
---

::: {.content-visible unless-format="revealjs"}

[Открыть слайды](../slides/lectures/01-types-operators.html){.btn .btn-outline-primary target="_blank"}

:::

## План лекции


- Идентификаторы и стиль кода
- Типы данных, литералы и представление чисел
- Операторы, преобразования типов и приоритет операций

## Hello, world!


```{.cpp filename="hello-world.cpp"}
{{< include ../examples/01-types-operators/hello-world.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-01-hello-world]{aria-label="Open in Compiler Explorer"}

## Идентификаторы


- [Идентификаторы][cppref-identifiers] — имена переменных, типов, функций и других элементов программы
- Идентификаторы могут содержать разрешённые стандартом символы Unicode, цифры и `_`
- Имя не должно начинаться с цифры
- Прописные и строчные буквы различаются: `value` и `Value` — разные имена
- Имя не должно совпадать с [ключевым словом C++][cppref-keyword]


## Code Style


Что вы скажете про такой код?

::: {.code-swap}

::: {.fragment .fade-out}

```{.cpp filename="bad-code-style.cpp"}
{{< include ../examples/01-types-operators/bad-code-style.cpp >}}
```

:::

::: {.fragment .fade-in}

```{.cpp filename="good-code-style.cpp"}
{{< include ../examples/01-types-operators/good-code-style.cpp >}}
```

:::

:::

## Code Style

На курсе используем:

- `snake_case` для переменных и пространств имён, `PascalCase` для функций и типов
- `kPascalCase` для констант
- четыре пробела для отступа, фигурная скобка — на той же строке
- фигурные скобки для ветвлений и циклов
- `clang-format`; за основу берём [Google C++ Style Guide](https://google.github.io/styleguide/cppguide.html)


## Объявление и определение переменных


[Объявление][cppref-declarations] сообщает компилятору имя и тип. Определение также создаёт объект:

```cpp
extern int global_count;  // объявление, но не определение

int global_count = 0;     // определение
double radius = 1.23;     // определение
char grade = 'A';         // определение
```

Каждое [определение][cppref-definition] является объявлением, но не каждое объявление является определением.

## [Определение без инициализатора][cppref-default-initialization]

```{.cpp filename="uninitialized-local.cpp" code-line-numbers="|4|6"}
{{< include ../examples/01-types-operators/uninitialized-local.cpp >}}
```

- `int value;` определяет локальную переменную, но не задаёт ей значение
- Чтение неопределённого значения в строке 6 — **[undefined behavior][cppref-ub]**



## [Встроенные типы данных][cppref-types]


- **Целочисленные:** [`bool`][cppref-types-boolean-type], [`char`][cppref-types-character-types], [`short`][cppref-types-standard-integer-types], [`int`][cppref-types-standard-integer-types], [`long`][cppref-types-standard-integer-types], [`long long`][cppref-types-standard-integer-types]
- **С плавающей точкой:** [`float`][cppref-types-floating-point-types], [`double`][cppref-types-floating-point-types], [`long double`][cppref-types-floating-point-types]
- **Специальные:** [`void`][cppref-types-void], [`std::nullptr_t`][cppref-nullptr-t]
- Для символов также существуют [`wchar_t`][cppref-types-character-types], [`char8_t`][cppref-types-character-types], [`char16_t`][cppref-types-character-types], [`char32_t`][cppref-types-character-types]

[`char`][cppref-types-character-types] — целочисленный тип, хотя обычно используется для хранения символов.


## Модификаторы целочисленных типов


```cpp
short int small_value = -10;
long int large_value = 1'000'000L;
long long very_large_value = 9'000'000'000LL;

signed int temperature = -20;
unsigned int student_count = 30U;
unsigned long file_size = 4'000'000UL;
```

- [`signed`][cppref-types-standard-integer-types] разрешает отрицательные значения
- [`unsigned`][cppref-types-standard-integer-types] хранит только неотрицательные значения
- [`short`][cppref-types-standard-integer-types] и [`long`][cppref-types-standard-integer-types] меняют минимально гарантированный диапазон типа
- Слово [`int`][cppref-types-standard-integer-types] обычно можно опустить: [`unsigned`][cppref-types-standard-integer-types] означает [`unsigned int`][cppref-types-standard-integer-types]

## Арифметика [`unsigned`][cppref-types-standard-integer-types]

```{.cpp filename="unsigned-arithmetic.cpp" code-line-numbers="|4|5-6|8-10"}
{{< include ../examples/01-types-operators/unsigned-arithmetic.cpp >}}
```

- `0U - 1U` даёт максимум типа: арифметика [`unsigned`][cppref-types-standard-integer-types] выполняется по модулю $2^N$
- В сравнении [`int`][cppref-types-standard-integer-types] с [`unsigned int`][cppref-types-standard-integer-types] значение типа [`int`][cppref-types-standard-integer-types] преобразуется в [`unsigned int`][cppref-types-standard-integer-types]
- Поэтому `-1 < 10U` ложно: [`unsigned`][cppref-types-standard-integer-types] не защищает от ошибок со знаком

## <span class="fragment fade-out" data-fragment-index="0">••••••••••••••••••••••••••••••••</span><span class="fragment fade-in" data-fragment-index="0">Переполнение <code>int</code> в бинарном поиске</span> {.mystery-heading}

```cpp
int middle = (left + right) / 2;
```

::: {.fragment data-fragment-index="1"}

```cpp
int middle = left + (right - left) / 2;
```

`left + right` может переполнить `int` (UB для знаковых типов) при больших индексах — именно такой баг почти 10 лет жил в `java.util.Arrays.binarySearch` из Java SDK.

:::

## Размеры типов зависят от платформы


Пример для Linux x86-64 с ABI* [LP64][cppref-types-data-models]:

| Тип | Размер |
|---|---:|
| [`char`][cppref-types-character-types] | 1 байт |
| [`short`][cppref-types-standard-integer-types] | 2 байта |
| [`int`][cppref-types-standard-integer-types] | 4 байта |
| [`long`][cppref-types-standard-integer-types] | 8 байт |
| [`long long`][cppref-types-standard-integer-types] | 8 байт |
| [`float`][cppref-types-floating-point-types] | 4 байта |
| [`double`][cppref-types-floating-point-types] | 8 байт |

На другой архитектуре, в другой ОС или у другого компилятора размеры могут отличаться. Всегда верно только [`sizeof(char) == 1`][cppref-sizeof].

::: {.fragment style="font-size: 0.75em;"}
\* **ABI** (Application Binary Interface) — двоичный интерфейс: соглашения о размерах и выравнивании типов, передаче аргументов и возврате значений при вызове функций. Они позволяют отдельно скомпилированным частям программы работать вместе.
:::


## Как узнать размер типа


```{.cpp filename="type-sizes.cpp"}
{{< include ../examples/01-types-operators/type-sizes.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-01-type-sizes]{aria-label="Open in Compiler Explorer"}

[`sizeof`][cppref-sizeof] возвращает размер в байтах платформы и имеет тип [`std::size_t`][cppref-size-t].



## Диапазоны типов: [`numeric_limits`][cppref-numeric-limits]


```{.cpp filename="numeric-limits.cpp"}
{{< include ../examples/01-types-operators/numeric-limits.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-01-numeric-limits]{aria-label="Open in Compiler Explorer"}

- [`lowest()`][cppref-numeric-limits-lowest] — наименьшее конечное значение
- [`max()`][cppref-numeric-limits-max] — наибольшее конечное значение
- Для [`double`][cppref-types-floating-point-types] функция [`min()`][cppref-numeric-limits-min] возвращает наименьшее **положительное нормализованное** значение


## [Типы с явно заданной шириной][cppref-integer]


Заголовочный файл [`<cstdint>`][cppref-header-cstdint] объявляет типы:

```cpp
std::int8_t   std::uint8_t
std::int16_t  std::uint16_t
std::int32_t  std::uint32_t
std::int64_t  std::uint64_t
```

- Число в имени — ширина типа в битах
- Используйте такие типы, когда размер является частью контракта: формат файла, протокол, регистр устройства
- Тип точной ширины доступен, только если платформа умеет его предоставить
- Для обычных счётчиков и вычислений часто достаточно [`int`][cppref-types-standard-integer-types]

## [Целочисленные литералы][cppref-integer-literal]


```{.cpp filename="integer-literals.cpp"}
{{< include ../examples/01-types-operators/integer-literals.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-01-integer-literals]{aria-label="Open in Compiler Explorer"}

- Литерал с ведущим `0` записывается в восьмеричной системе: `0242`
- Префиксы `0x` и `0b` задают шестнадцатеричную и двоичную системы
- Апостроф разделяет разряды и не меняет значение
- Суффиксы: `U` — [`unsigned`][cppref-types-standard-integer-types], `L` — [`long`][cppref-types-standard-integer-types], `LL` — [`long long`][cppref-types-standard-integer-types]



## [Вещественные литералы][cppref-floating-literal]


```{.cpp filename="floating-point-literals.cpp"}
{{< include ../examples/01-types-operators/floating-point-literals.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-01-floating-literals]{aria-label="Open in Compiler Explorer"}

- Без суффикса литерал имеет тип [`double`][cppref-types-floating-point-types]
- `F` задаёт [`float`][cppref-types-floating-point-types], `L` — [`long double`][cppref-types-floating-point-types]
- Запись `1.5E6` означает $1{,}5 \cdot 10^6$
- Не все десятичные дроби представимы в двоичном виде точно



## Прямой код

Старший бит хранит знак, остальные биты — модуль числа:

```text
+5 = 0000 0101
-5 = 1000 0101
+0 = 0000 0000
-0 = 1000 0000
```

Если просто сложить представления, арифметика не работает:

```text
  0000 0101
+ 1000 0101
------------
  1000 1010  → -10, а не 0
```

- Для разных знаков нужно отдельно сравнивать и вычитать модули
- У нуля два представления, диапазон восьми бит — от $-127$ до $127$

## Обратный код

Положительные числа записываются как обычно, у отрицательных инвертируются все биты:

```text
+5 = 0000 0101
-5 = 1111 1010
+0 = 0000 0000
-0 = 1111 1111
```

При сложении перенос из старшего разряда приходится возвращать в младший:

```text
  0000 0101  (+5)
+ 1111 1100  (-3)
------------
1 0000 0001
+          1  ← циклический перенос
------------
  0000 0010  (+2)
```

- Два представления нуля сохраняются
- Обычной схемы двоичного сложения без дополнительного шага недостаточно

## Дополнительный код


Для восьми бит:

```text
 5 = 0000 0101
-5 = 1111 1011  ← инвертировать биты 5 и прибавить 1
```

- Сложение работает одной и той же схемой для положительных и отрицательных чисел
- Для нуля существует единственное представление
- Диапазон восьми бит расширяется до значений от $-128$ до $127$
- Для положительного `x` $N$-битный шаблон числа `-x` соответствует $2^N - x$
- [Начиная с C++20 стандарт требует представлять знаковые целые числа в дополнительном коде][cppref-types-range-of-values]

```text
  0000 0101
+ 1111 1011
------------
1 0000 0000  → младшие восемь бит равны нулю
```

Переполнение знакового целого в C++ всё равно не определено. В частности, выражение `-INT_MIN` имеет [undefined behavior][cppref-ub].

## Представление вещественных чисел

Распространённый формат [`float`][cppref-types-floating-point-types] — IEEE 754 `binary32`:

| Знак | Смещённая экспонента (порядок) | Дробная часть (мантисса) |
|---:|---:|---:|
| 1 бит | 8 бит | 23 бита |

Для нормализованных чисел значение равно $(-1)^s \cdot (1.f)_2 \cdot 2^{e - 127}$.

```text
5.75₁₀ = 101.11₂ = 1.0111₂ × 2²
s = 0
e = 2 + 127 = 129 = 10000001₂
f = 01110000000000000000000₂

биты: 0 | 10000001 | 01110000000000000000000
```

Ведущая единица не хранится. Ограниченная дробная часть приводит к округлению.



## [Символьные литералы][cppref-character-literal]


Символьный литерал записывается в одинарных кавычках:

```cpp
char letter = 'x';
char newline = '\n';        // новая строка
char tab = '\t';            // горизонтальная табуляция
char backslash = '\\';      // обратная косая черта
char single_quote = '\'';   // одинарная кавычка
```

**[Escape-последовательности (экранирующие последовательности)][cppref-escape]** начинаются с `\` и позволяют записать специальные символы:

- `\n` — перевод строки, `\t` — табуляция, `\0` — нулевой символ
- `\\` — обратная косая черта, `\'` — одинарная кавычка, `\"` — двойная кавычка
- `'\n'` обозначает один символ перевода строки, а не два символа `\` и `n`

Эти последовательности работают и в строковых литералах.

## [Строковые литералы][cppref-string-literal]


```cpp
const char message[] = "Hello, world!\n";
const char quote[] = "He said: \"Hello!\"";
```

- Обычный строковый литерал — это [массив символов](https://en.cppreference.com/w/cpp/language/array.html) типа `const char[N]`
- Размер `N` включает завершающий нулевой символ `\0`
- В примере литералы инициализируют отдельные массивы `message` и `quote`
- Квалификатор [`const`][cppref-cv] запрещает изменять элементы этих массивов

## [`bool`][cppref-types-boolean-type]


- [`true`][cppref-bool-literal] — истина
- [`false`][cppref-bool-literal] — ложь

Значения [`bool`][cppref-types-boolean-type] используются в условиях и являются результатом сравнений:

```cpp
bool is_positive = value > 0;
```

## [`enum`][cppref-enum] & [`enum class`][cppref-enum]

```{.cpp filename="enum-kinds.cpp" code-line-numbers="|1|2|5-6"}
{{< include ../examples/01-types-operators/enum-kinds.cpp >}}
```

| | `enum Color` | `enum class Direction` |
|---|---|---|
| Имена элементов | `kRed` виден снаружи | Только `Direction::kLeft` |
| Преобразование в [`int`][cppref-types-standard-integer-types] | Неявное | Только явное |

Обычно выбирают [`enum class`][cppref-enum]: меньше конфликтов имён и случайных преобразований.


## Операторы


- [Арифметические][cppref-operator-arithmetic]: `+`, `-`, `*`, `/`, `%`
- [Сравнение][cppref-operator-comparison]: `>`, `>=`, `<`, `<=`, `==`, `!=`
- [Логические][cppref-operator-logical]: `&&`, `||`, `!`
- [Инкремент и декремент][cppref-operator-incdec]: `++`, `--`
- [Побитовые][cppref-operator-arithmetic]: `&`, `|`, `^`, `<<`, `>>`, `~`
- [Присваивание][cppref-operator-assignment]: `=`, `+=`, `-=`, `*=`, `/=`, `%=`
- [Условный][cppref-operator-other]: `?:`
- Другие: [`sizeof`][cppref-sizeof], преобразования типов, …

## Преобразования типов


- Компилятор выполняет [неявные преобразования операндов к общему типу][cppref-usual-arithmetic-conversions]
- [`char`][cppref-types-character-types] и [`short`][cppref-types-standard-integer-types] обычно сначала преобразуются в [`int`][cppref-types-standard-integer-types]
- При смешивании целых и вещественных типов результат обычно становится вещественным
- Смешивание знаковых и беззнаковых типов требует особой осторожности
- Явное преобразование пока записываем в [C-style форме][cppref-explicit-cast]: `(тип)выражение`

```{.cpp filename="type-conversions.cpp" code-line-numbers="|4-5|7-8"}
{{< include ../examples/01-types-operators/type-conversions.cpp >}}
```

## [`sizeof`][cppref-sizeof]


Оператор [`sizeof`][cppref-sizeof] применим к типу или выражению:

```cpp
sizeof(int)
sizeof(double)
sizeof(variable)
```

- Результат имеет тип [`std::size_t`][cppref-size-t]
- [`sizeof(char)`][cppref-sizeof] всегда равен `1`
- Количество бит в байте доступно как [`CHAR_BIT`][cppref-climits] из [`<climits>`][cppref-header-climits]

Полная программа приведена на слайде «Как узнать размер типа».

## Приоритет операторов

Это сокращённая [таблица приоритетов][cppref-operator-precedence]: меньший номер означает более высокий приоритет.

::: {style="font-size: 0.85em;"}

| № | Уровень | Операторы |
|---:|---|---|
| 1 | Постфиксные | `a[k]`, `f()`, `.`, `->`, `a++`, `a--` |
| 2 | Унарные | `++a`, `--a`, `!`, `~`, `+`, `-`, `*`, `&`, [`sizeof`][cppref-sizeof] |
| 3 | Умножение | `*`, `/`, `%` |
| 4 | Сложение | `+`, `-` |
| 5 | Сдвиги | `<<`, `>>` |
| 6 | Отношения | `<`, `<=`, `>`, `>=` |
| 7 | Равенство | `==`, `!=` |
| 8 | Побитовое И | `&` |
| 9 | Побитовое исключающее ИЛИ | `^` |
| 10 | Побитовое ИЛИ | `|` |
| 11 | Логическое И | `&&` |
| 12 | Логическое ИЛИ | `||` |
| 13 | Условный | `?:` |
| 14 | Присваивание | `=`, `+=`, `-=`, `*=`, `/=`, … |
| 15 | Запятая | `,` |

:::

Приоритет не задаёт [порядок вычисления операндов][cppref-eval-order]. Если выражение трудно прочитать — добавьте скобки.

## Как читается выражение?

Пусть переменные имеют тип [`int`][cppref-types-standard-integer-types]: `a = 1`, `b = 2`, `c = 3`, `d = 1`.

```cpp
a + b * c << d || 25 != 32 && !c++
```

::: {.fragment}

С учётом приоритета:

```cpp
((a + (b * c)) << d) || ((25 != 32) && (!(c++)))
```

Левая часть: `(1 + 2 * 3) << 1` → `7 << 1` → `14`.


:::

[godbolt-01-hello-world]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%0Aint+main()+%7B%0A++++std::cout+%3C%3C+%22Hello,+world!!%5Cn%22%3B%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/01-types-operators/hello-world.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-01-type-sizes]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ccstdint%3E%0A%23include+%3Ciostream%3E%0A%0Aint+main()+%7B%0A++++std::cout+%3C%3C+%22sizeof(char)+%3D+%22+%3C%3C+sizeof(char)+%3C%3C+!'%5Cn!'%3B%0A++++std::cout+%3C%3C+%22sizeof(short)+%3D+%22+%3C%3C+sizeof(short)+%3C%3C+!'%5Cn!'%3B%0A++++std::cout+%3C%3C+%22sizeof(int)+%3D+%22+%3C%3C+sizeof(int)+%3C%3C+!'%5Cn!'%3B%0A++++std::cout+%3C%3C+%22sizeof(long)+%3D+%22+%3C%3C+sizeof(long)+%3C%3C+!'%5Cn!'%3B%0A++++std::cout+%3C%3C+%22sizeof(long+long)+%3D+%22+%3C%3C+sizeof(long+long)+%3C%3C+!'%5Cn!'%3B%0A++++std::cout+%3C%3C+%22sizeof(std::int32_t)+%3D+%22+%3C%3C+sizeof(std::int32_t)+%3C%3C+!'%5Cn!'%3B%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/01-types-operators/type-sizes.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-01-numeric-limits]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%23include+%3Climits%3E%0A%0Aint+main()+%7B%0A++++std::cout+%3C%3C+%22long:+%5B%22+%3C%3C+std::numeric_limits%3Clong%3E::lowest()+%3C%3C+%22,+%22%0A++++++++++++++%3C%3C+std::numeric_limits%3Clong%3E::max()+%3C%3C+%22%5D%5Cn%22%3B%0A++++std::cout+%3C%3C+%22double:+%5B%22+%3C%3C+std::numeric_limits%3Cdouble%3E::lowest()+%3C%3C+%22,+%22%0A++++++++++++++%3C%3C+std::numeric_limits%3Cdouble%3E::max()+%3C%3C+%22%5D%5Cn%22%3B%0A++++std::cout+%3C%3C+%22smallest+positive+normalized+double:+%22+%3C%3C+std::numeric_limits%3Cdouble%3E::min()%0A++++++++++++++%3C%3C+!'%5Cn!'%3B%0A++++std::cout+%3C%3C+%22char+is+signed:+%22+%3C%3C+std::numeric_limits%3Cchar%3E::is_signed+%3C%3C+!'%5Cn!'%3B%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/01-types-operators/numeric-limits.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-01-integer-literals]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%0Aint+main()+%7B%0A++++int+decimal+%3D+162%3B%0A++++int+octal+%3D+0242%3B%0A++++int+hexadecimal+%3D+0xA2%3B%0A++++int+binary+%3D+0b1010!'0010%3B%0A++++unsigned+long+population+%3D+1!'000!'000UL%3B%0A%0A++++std::cout+%3C%3C+decimal+%3C%3C+!'+!'+%3C%3C+octal+%3C%3C+!'+!'+%3C%3C+hexadecimal+%3C%3C+!'+!'+%3C%3C+binary+%3C%3C+!'%5Cn!'%3B%0A++++std::cout+%3C%3C+population+%3C%3C+!'%5Cn!'%3B%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/01-types-operators/integer-literals.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-01-floating-literals]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%0Aint+main()+%7B%0A++++double+fraction+%3D+0.15%3B%0A++++float+single_precision+%3D+0.15F%3B%0A++++long+double+scientific+%3D+15E-2L%3B%0A++++double+large_value+%3D+1.5E6%3B%0A%0A++++std::cout+%3C%3C+fraction+%3C%3C+!'%5Cn!'%3B%0A++++std::cout+%3C%3C+single_precision+%3C%3C+!'%5Cn!'%3B%0A++++std::cout+%3C%3C+scientific+%3C%3C+!'%5Cn!'%3B%0A++++std::cout+%3C%3C+large_value+%3C%3C+!'%5Cn!'%3B%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/01-types-operators/floating-point-literals.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[cppref-bool-literal]: https://en.cppreference.com/w/cpp/language/bool_literal.html

[cppref-character-literal]: https://en.cppreference.com/w/cpp/language/character_literal.html

[cppref-climits]: https://en.cppreference.com/w/cpp/types/climits.html

[cppref-cv]: https://en.cppreference.com/w/cpp/language/cv.html

[cppref-declarations]: https://en.cppreference.com/w/cpp/language/declarations.html

[cppref-default-initialization]: https://en.cppreference.com/w/cpp/language/default_initialization.html

[cppref-definition]: https://en.cppreference.com/w/cpp/language/definition.html

[cppref-enum]: https://en.cppreference.com/w/cpp/language/enum.html

[cppref-escape]: https://en.cppreference.com/w/cpp/language/escape.html

[cppref-eval-order]: https://en.cppreference.com/w/cpp/language/eval_order.html

[cppref-explicit-cast]: https://en.cppreference.com/w/cpp/language/explicit_cast.html

[cppref-floating-literal]: https://en.cppreference.com/w/cpp/language/floating_literal.html

[cppref-header-climits]: https://en.cppreference.com/w/cpp/header/climits.html

[cppref-header-cstdint]: https://en.cppreference.com/w/cpp/header/cstdint.html

[cppref-identifiers]: https://en.cppreference.com/w/cpp/language/identifiers.html

[cppref-integer]: https://en.cppreference.com/w/cpp/types/integer.html

[cppref-integer-literal]: https://en.cppreference.com/w/cpp/language/integer_literal.html

[cppref-keyword]: https://en.cppreference.com/w/cpp/keyword.html

[cppref-nullptr-t]: https://en.cppreference.com/w/cpp/types/nullptr_t.html

[cppref-numeric-limits]: https://en.cppreference.com/w/cpp/types/numeric_limits.html

[cppref-numeric-limits-lowest]: https://en.cppreference.com/w/cpp/types/numeric_limits/lowest.html

[cppref-numeric-limits-max]: https://en.cppreference.com/w/cpp/types/numeric_limits/max.html

[cppref-numeric-limits-min]: https://en.cppreference.com/w/cpp/types/numeric_limits/min.html

[cppref-operator-precedence]: https://en.cppreference.com/w/cpp/language/operator_precedence.html

[cppref-size-t]: https://en.cppreference.com/w/cpp/types/size_t.html

[cppref-sizeof]: https://en.cppreference.com/w/cpp/language/sizeof.html

[cppref-string-literal]: https://en.cppreference.com/w/cpp/language/string_literal.html

[cppref-types]: https://en.cppreference.com/w/cpp/language/types.html

[cppref-types-boolean-type]: https://en.cppreference.com/w/cpp/language/types.html#Boolean_type

[cppref-types-character-types]: https://en.cppreference.com/w/cpp/language/types.html#Character_types

[cppref-types-data-models]: https://en.cppreference.com/w/cpp/language/types.html#Data_models

[cppref-types-floating-point-types]: https://en.cppreference.com/w/cpp/language/types.html#Floating-point_types

[cppref-types-range-of-values]: https://en.cppreference.com/w/cpp/language/types.html#Range_of_values

[cppref-types-standard-integer-types]: https://en.cppreference.com/w/cpp/language/types.html#Standard_integer_types

[cppref-types-void]: https://en.cppreference.com/w/cpp/language/types.html#void

[cppref-ub]: https://en.cppreference.com/w/cpp/language/ub.html

[cppref-usual-arithmetic-conversions]: https://en.cppreference.com/w/cpp/language/usual_arithmetic_conversions.html

[cppref-operator-arithmetic]: https://en.cppreference.com/w/cpp/language/operator_arithmetic.html

[cppref-operator-assignment]: https://en.cppreference.com/w/cpp/language/operator_assignment.html

[cppref-operator-comparison]: https://en.cppreference.com/w/cpp/language/operator_comparison.html

[cppref-operator-incdec]: https://en.cppreference.com/w/cpp/language/operator_incdec.html

[cppref-operator-logical]: https://en.cppreference.com/w/cpp/language/operator_logical.html

[cppref-operator-other]: https://en.cppreference.com/w/cpp/language/operator_other.html
