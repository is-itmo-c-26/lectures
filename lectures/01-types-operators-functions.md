---
title: "Лекция 1. Типы, операторы и функции"
---

::: {.content-visible unless-format="revealjs"}

[Открыть слайды](../slides/lectures/01-types-operators-functions.html){.btn .btn-outline-primary target="_blank"}

:::

## План лекции


- Типы данных, идентификаторы и представление целых чисел
- Операторы и выражения
- Ветвления и циклы
- Функции

## Hello, world!


```{.cpp filename="hello-world.cpp"}
{{< include ../examples/01-types-operators-functions/hello-world.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-01-hello-world]{aria-label="Open in Compiler Explorer"}

## Идентификаторы


- Идентификаторы — имена переменных, типов, функций и других элементов программы
- Идентификаторы могут содержать разрешённые стандартом символы Unicode, цифры и `_`
- Имя не должно начинаться с цифры
- Прописные и строчные буквы различаются: `value` и `Value` — разные имена
- Имя не должно совпадать с ключевым словом C++


## Code Style


Что вы скажете про такой код?

```{.cpp filename="bad-code-style.cpp"}
{{< include ../examples/01-types-operators-functions/bad-code-style.cpp >}}
```

## Code Style

На курсе используем:

- `snake_case` для переменных и пространств имён, `PascalCase` для функций и типов
- `kPascalCase` для констант
- четыре пробела для отступа, фигурная скобка — на той же строке
- фигурные скобки для ветвлений и циклов
- `clang-format`; за основу берём [Google C++ Style Guide](https://google.github.io/styleguide/cppguide.html)

## Встроенные типы данных


- **Целочисленные:** `bool`, `char`, `short`, `int`, `long`, `long long`
- **С плавающей точкой:** `float`, `double`, `long double`
- **Специальные:** `void`, `std::nullptr_t`
- Для символов также существуют `wchar_t`, `char8_t`, `char16_t`, `char32_t`

`char` — целочисленный тип, хотя обычно используется для хранения символов.


## Модификаторы целочисленных типов


```cpp
short int small_value = -10;
long int large_value = 1'000'000L;
long long very_large_value = 9'000'000'000LL;

signed int temperature = -20;
unsigned int student_count = 30U;
unsigned long file_size = 4'000'000UL;
```

- `signed` разрешает отрицательные значения
- `unsigned` хранит только неотрицательные значения
- `short` и `long` меняют минимально гарантированный диапазон типа
- Слово `int` обычно можно опустить: `unsigned` означает `unsigned int`

## Арифметика `unsigned`

```{.cpp filename="unsigned-arithmetic.cpp" code-line-numbers="|4|5-6|8-10"}
{{< include ../examples/01-types-operators-functions/unsigned-arithmetic.cpp >}}
```

- `0U - 1U` даёт максимум типа: арифметика `unsigned` выполняется по модулю $2^N$
- В сравнении `int` с `unsigned int` значение типа `int` преобразуется в `unsigned int`
- Поэтому `-1 < 10U` ложно: `unsigned` не защищает от ошибок со знаком

## Размеры типов зависят от платформы


Пример для Linux x86-64 с ABI LP64:

| Тип | Размер |
|---|---:|
| `char` | 1 байт |
| `short` | 2 байта |
| `int` | 4 байта |
| `long` | 8 байт |
| `long long` | 8 байт |
| `float` | 4 байта |
| `double` | 8 байт |

На другой архитектуре, в другой ОС или у другого компилятора размеры могут отличаться. Всегда верно только `sizeof(char) == 1`.


## Как узнать размер типа


```{.cpp filename="type-sizes.cpp"}
{{< include ../examples/01-types-operators-functions/type-sizes.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-01-type-sizes]{aria-label="Open in Compiler Explorer"}

`sizeof` возвращает размер в байтах платформы и имеет тип `std::size_t`.



## Диапазоны типов: `numeric_limits`


```{.cpp filename="numeric-limits.cpp"}
{{< include ../examples/01-types-operators-functions/numeric-limits.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-01-numeric-limits]{aria-label="Open in Compiler Explorer"}

- `lowest()` — наименьшее конечное значение
- `max()` — наибольшее конечное значение
- Для `double` функция `min()` возвращает наименьшее **положительное нормализованное** значение


## Типы с явно заданной шириной


Заголовочный файл `<cstdint>` объявляет типы:

```cpp
std::int8_t   std::uint8_t
std::int16_t  std::uint16_t
std::int32_t  std::uint32_t
std::int64_t  std::uint64_t
```

- Число в имени — ширина типа в битах
- Используйте такие типы, когда размер является частью контракта: формат файла, протокол, регистр устройства
- Тип точной ширины доступен, только если платформа умеет его предоставить
- Для обычных счётчиков и вычислений часто достаточно `int`

## Целочисленные литералы


```{.cpp filename="integer-literals.cpp"}
{{< include ../examples/01-types-operators-functions/integer-literals.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-01-integer-literals]{aria-label="Open in Compiler Explorer"}

- Литерал с ведущим `0` записывается в восьмеричной системе: `0242`
- Префиксы `0x` и `0b` задают шестнадцатеричную и двоичную системы
- Апостроф разделяет разряды и не меняет значение
- Суффиксы: `U` — `unsigned`, `L` — `long`, `LL` — `long long`



## Вещественные литералы


```{.cpp filename="floating-point-literals.cpp"}
{{< include ../examples/01-types-operators-functions/floating-point-literals.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-01-floating-literals]{aria-label="Open in Compiler Explorer"}

- Без суффикса литерал имеет тип `double`
- `F` задаёт `float`, `L` — `long double`
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
- Начиная с C++20 стандарт требует представлять знаковые целые числа в дополнительном коде

```text
  0000 0101
+ 1111 1011
------------
1 0000 0000  → младшие восемь бит равны нулю
```

Переполнение знакового целого в C++ всё равно не определено. В частности, выражение `-INT_MIN` имеет undefined behavior.

## Представление вещественных чисел

Распространённый формат `float` — IEEE 754 `binary32`:

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



## Символьные литералы


Символьный литерал записывается в одинарных кавычках:

```cpp
char letter = 'x';
char newline = '\n';        // новая строка
char tab = '\t';            // горизонтальная табуляция
char backslash = '\\';      // обратная косая черта
char single_quote = '\'';   // одинарная кавычка
```

Экранирующая последовательность начинается с обратной косой черты `\`.

## Строковые литералы


```cpp
const char message[] = "Hello, world!\n";
const char quote[] = "He said: \"Hello!\"";
```

- Обычный строковый литерал имеет тип `const char[N]`
- Размер `N` включает завершающий нулевой символ `\0`
- В примере литералы инициализируют отдельные массивы `message` и `quote`
- Квалификатор `const` запрещает изменять элементы этих массивов

## `bool`


- `true` — истина
- `false` — ложь

Значения `bool` используются в условиях и являются результатом сравнений:

```cpp
bool is_positive = value > 0;
```

## `enum` & `enum class`

```{.cpp filename="enum-kinds.cpp" code-line-numbers="|1|2|5-6"}
{{< include ../examples/01-types-operators-functions/enum-kinds.cpp >}}
```

| | `enum Color` | `enum class Direction` |
|---|---|---|
| Имена элементов | `kRed` виден снаружи | Только `Direction::kLeft` |
| Преобразование в `int` | Неявное | Только явное |

Обычно выбирают `enum class`: меньше конфликтов имён и случайных преобразований.

## Объявление и определение переменных


Объявление сообщает компилятору имя и тип. Определение также создаёт объект:

```cpp
extern int global_count;  // объявление, но не определение

int global_count = 0;     // определение
double radius = 1.23;     // определение
char grade = 'A';         // определение
```

Каждое определение является объявлением, но не каждое объявление является определением.

## Определение без инициализатора

```{.cpp filename="uninitialized-local.cpp" code-line-numbers="|4|6"}
{{< include ../examples/01-types-operators-functions/uninitialized-local.cpp >}}
```

- `int value;` определяет локальную переменную, но не задаёт ей значение
- Чтение неопределённого значения в строке 6 — **undefined behavior**
- Пример намеренно некорректен: запускать его не следует

## Операторы


- Арифметические: `+`, `-`, `*`, `/`, `%`
- Сравнение: `>`, `>=`, `<`, `<=`, `==`, `!=`
- Логические: `&&`, `||`, `!`
- Инкремент и декремент: `++`, `--`
- Побитовые: `&`, `|`, `^`, `<<`, `>>`, `~`
- Присваивание: `=`, `+=`, `-=`, `*=`, `/=`, `%=`
- Условный: `?:`
- Другие: `sizeof`, преобразования типов, …

## Преобразования типов


- Компилятор выполняет неявные преобразования операндов к общему типу
- `char` и `short` обычно сначала преобразуются в `int`
- При смешивании целых и вещественных типов результат обычно становится вещественным
- Смешивание знаковых и беззнаковых типов требует особой осторожности
- Явное преобразование пока записываем в C-style форме: `(тип)выражение`

```{.cpp filename="type-conversions.cpp" code-line-numbers="|4-5|7-8"}
{{< include ../examples/01-types-operators-functions/type-conversions.cpp >}}
```

## `sizeof`


Оператор `sizeof` применим к типу или выражению:

```cpp
sizeof(int)
sizeof(double)
sizeof(variable)
```

- Результат имеет тип `std::size_t`
- `sizeof(char)` всегда равен `1`
- Количество бит в байте доступно как `CHAR_BIT` из `<climits>`

Полная программа приведена на слайде «Как узнать размер типа».

## Приоритет операторов: уровни 1–7

Это сокращённая таблица: меньший номер означает более высокий приоритет.

| № | Уровень | Операторы |
|---:|---|---|
| 1 | Постфиксные | `a[k]`, `f()`, `.`, `->`, `a++`, `a--` |
| 2 | Унарные | `++a`, `--a`, `!`, `~`, `+`, `-`, `*`, `&`, `sizeof` |
| 3 | Умножение | `*`, `/`, `%` |
| 4 | Сложение | `+`, `-` |
| 5 | Сдвиги | `<<`, `>>` |
| 6 | Отношения | `<`, `<=`, `>`, `>=` |
| 7 | Равенство | `==`, `!=` |

## Приоритет операторов: уровни 8–15

Это сокращённая таблица: меньший номер означает более высокий приоритет.

| № | Уровень | Операторы |
|---:|---|---|
| 8 | Побитовое И | `&` |
| 9 | Побитовое исключающее ИЛИ | `^` |
| 10 | Побитовое ИЛИ | `|` |
| 11 | Логическое И | `&&` |
| 12 | Логическое ИЛИ | `||` |
| 13 | Условный | `?:` |
| 14 | Присваивание | `=`, `+=`, `-=`, `*=`, `/=`, … |
| 15 | Запятая | `,` |

Приоритет не задаёт порядок вычисления операндов. Если выражение трудно прочитать — добавьте скобки.

## Как читается выражение?


```cpp
a + b * c << d || 25 != 32 && !c++
```

::: {.fragment}

С учётом приоритета:

```cpp
((a + (b * c)) << d) || ((25 != 32) && (!(c++)))
```

В рабочем коде лучше сразу поставить скобки или разбить вычисление на несколько выражений.

:::

## Выражения, инструкции и блоки


Операторы входят в выражения:

```cpp
c = a + b;
i++;
```

В этих примерах `;` завершает инструкцию. Несколько инструкций можно объединить в блок:

```cpp
{
    print_message();
    ++message_count;
}
```

## Условный оператор `if-else`


```cpp
if (condition) {
    statement_when_true();
} else {
    statement_when_false();
}
```

- Ветвь `else` может отсутствовать
- Числовое значение `0` в условии означает `false`, ненулевое — `true`
- На курсе всегда используем фигурные скобки

## К какому `if` относится `else`?

`outer_condition == false`. Что напечатает программа: `result = 0` или `result = 2`?

```{.cpp filename="dangling-else.cpp" code-line-numbers="|8-12|14"}
{{< include ../examples/01-types-operators-functions/dangling-else.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-01-dangling-else]{aria-label="Open in Compiler Explorer"}

В примере фигурные скобки намеренно опущены.

## Фигурные скобки делают структуру явной

Покажем компилятору, что `else` относится к внешнему `if`:

```{.cpp filename="dangling-else-fixed.cpp" code-line-numbers="|8-14|16"}
{{< include ../examples/01-types-operators-functions/dangling-else-fixed.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-01-dangling-else-fixed]{aria-label="Open in Compiler Explorer"}

Теперь программа печатает `result = 2`, а структура не зависит от отступов.

## Цепочка `else if`


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

## Цикл `while`


```cpp
int number = 5;

while (number > 0) {
    std::cout << number << '\n';
    --number;
}
```

Условие проверяется **до** каждой итерации. Цикл может не выполниться ни разу.

## Цикл `do-while`


```cpp
unsigned long number = 0;

do {
    std::cout << "Enter number (0 to end): ";
    std::cin >> number;
    std::cout << "You entered: " << number << '\n';
} while (number != 0);
```

Условие проверяется **после** итерации. Тело выполнится хотя бы один раз.

## Цикл `for`


```cpp
for (initialization; condition; step) {
    statement();
}
```

- `initialization` выполняется один раз
- `condition` проверяется перед каждой итерацией
- `step` выполняется после тела, в том числе при переходе через `continue`

## `continue` в цикле `for`

```{.cpp filename="for-continue.cpp" code-line-numbers="|4|5-7|8"}
{{< include ../examples/01-types-operators-functions/for-continue.cpp >}}
```

Цикл печатает `0 2`: после `continue` выполняется шаг `++i`.

Наивный `while` с `++i` в конце тела зациклится: при `i == 1` оператор `continue` пропустит `++i`.

## Примеры `for`


```cpp
for (int number = 10; number > 0; --number) {
    std::cout << number << ", ";
}

for (int left = 0, right = 100; left != right; ++left, --right) {
    std::cout << left << ", ";
}
```

Инициализация, условие и шаг собраны в заголовке цикла.

## Range-based `for`


```cpp
int values[] = {0, 1, 2, 3, 4, 5};

for (int value : values) {
    std::cout << value << ' ';
}
std::cout << '\n';
```

Цикл последовательно перебирает все элементы диапазона.

## Оператор `break`


```cpp
for (int number = 10; number > 0; --number) {
    if (number == 3) {
        std::cout << "countdown aborted!\n";
        break;
    }

    std::cout << number << ", ";
}
```

`break` немедленно завершает ближайший цикл или `switch`.

## Оператор `continue`


```cpp
for (int number = 10; number > 0; --number) {
    if (number == 5) {
        continue;
    }

    std::cout << number << ", ";
}
```

`continue` пропускает остаток текущей итерации.

## Оператор `switch`


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

## Как работает `switch`


- Выражение должно иметь целочисленный или перечислимый тип
- Метки `case` должны быть различными константными выражениями
- Выполнение начинается с совпавшей метки
- Если совпадения нет, управление переходит в `default`
- `break` завершает `switch`
- Без `break` выполнение переходит в следующую ветвь

## `switch` и `if-else`


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

`switch` удобен, когда одно значение сравнивается с несколькими константами.

## Группировка ветвей `switch`


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

## Функции


```cpp
return_type function_name(parameter_type parameter) {
    statements();
    return result;
}
```

- Параметры доступны внутри тела функции
- `return` завершает функцию и возвращает результат
- Выражение после `return` должно допускать неявное преобразование к возвращаемому типу функции

## Вызов функции


```{.cpp filename="addition-function.cpp"}
{{< include ../examples/01-types-operators-functions/addition-function.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-01-addition-function]{aria-label="Open in Compiler Explorer"}

## Объявление и определение функции


```{.cpp filename="function-declaration-definition.cpp"}
{{< include ../examples/01-types-operators-functions/function-declaration-definition.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-01-function-declaration]{aria-label="Open in Compiler Explorer"}

- Объявление сообщает сигнатуру функции
- Определение содержит тело функции



## Функция без возвращаемого значения


```{.cpp filename="void-function.cpp"}
{{< include ../examples/01-types-operators-functions/void-function.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-01-void-function]{aria-label="Open in Compiler Explorer"}

Тип `void` означает, что функция не возвращает значение.



## Функция `main`


Стандартные формы:

```cpp
int main() {
    // ...
}

int main(int argc, char* argv[]) {
    // ...
}
```

- Достижение конца `main` эквивалентно `return 0;`
- `EXIT_SUCCESS` и `EXIT_FAILURE` объявлены в `<cstdlib>`
- Дополнительные параметры `main` могут зависеть от реализации

## Аргументы командной строки


```{.cpp filename="command-line-arguments.cpp"}
{{< include ../examples/01-types-operators-functions/command-line-arguments.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-01-command-line-arguments]{aria-label="Open in Compiler Explorer"}

- `argc` — количество строк с аргументами в `argv`
- `argv` — массив указателей на строки с аргументами
- Если `argc > 0`, то `argv[0]` содержит имя запуска программы или пустую строку
- `argv[argc] == nullptr`



## Рекурсивная функция


```{.cpp filename="factorial-recursive.cpp"}
{{< include ../examples/01-types-operators-functions/factorial-recursive.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-01-factorial-recursive]{aria-label="Open in Compiler Explorer"}

Функция вызывает сама себя с меньшим аргументом. Условие `number == 0` останавливает рекурсию.



## Итеративная версия


```{.cpp filename="factorial-iterative.cpp"}
{{< include ../examples/01-types-operators-functions/factorial-iterative.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-01-factorial-iterative]{aria-label="Open in Compiler Explorer"}

Обе версии вычисляют одно значение, но цикл не создаёт цепочку рекурсивных вызовов.

Для достаточно большого `number` обе версии переполняют `unsigned long long`: поведение определено по модулю $2^N$, но результат перестаёт быть математическим факториалом.



## Сокрытие имён (shadowing)


```{.cpp filename="name-shadowing.cpp" code-line-numbers="|3-4|6-9|15-18|21"}
{{< include ../examples/01-types-operators-functions/name-shadowing.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-01-name-shadowing]{aria-label="Open in Compiler Explorer"}

Внутреннее объявление временно скрывает одноимённую переменную из внешней области видимости.



[godbolt-01-hello-world]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%0Aint+main()+%7B%0A++++std::cout+%3C%3C+%22Hello,+world!!%5Cn%22%3B%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/01-types-operators-functions/hello-world.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-01-type-sizes]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ccstdint%3E%0A%23include+%3Ciostream%3E%0A%0Aint+main()+%7B%0A++++std::cout+%3C%3C+%22sizeof(char)+%3D+%22+%3C%3C+sizeof(char)+%3C%3C+!'%5Cn!'%3B%0A++++std::cout+%3C%3C+%22sizeof(short)+%3D+%22+%3C%3C+sizeof(short)+%3C%3C+!'%5Cn!'%3B%0A++++std::cout+%3C%3C+%22sizeof(int)+%3D+%22+%3C%3C+sizeof(int)+%3C%3C+!'%5Cn!'%3B%0A++++std::cout+%3C%3C+%22sizeof(long)+%3D+%22+%3C%3C+sizeof(long)+%3C%3C+!'%5Cn!'%3B%0A++++std::cout+%3C%3C+%22sizeof(long+long)+%3D+%22+%3C%3C+sizeof(long+long)+%3C%3C+!'%5Cn!'%3B%0A++++std::cout+%3C%3C+%22sizeof(std::int32_t)+%3D+%22+%3C%3C+sizeof(std::int32_t)+%3C%3C+!'%5Cn!'%3B%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/01-types-operators-functions/type-sizes.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-01-numeric-limits]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%23include+%3Climits%3E%0A%0Aint+main()+%7B%0A++++std::cout+%3C%3C+%22long:+%5B%22+%3C%3C+std::numeric_limits%3Clong%3E::lowest()+%3C%3C+%22,+%22%0A++++++++++++++%3C%3C+std::numeric_limits%3Clong%3E::max()+%3C%3C+%22%5D%5Cn%22%3B%0A++++std::cout+%3C%3C+%22double:+%5B%22+%3C%3C+std::numeric_limits%3Cdouble%3E::lowest()+%3C%3C+%22,+%22%0A++++++++++++++%3C%3C+std::numeric_limits%3Cdouble%3E::max()+%3C%3C+%22%5D%5Cn%22%3B%0A++++std::cout+%3C%3C+%22smallest+positive+normalized+double:+%22+%3C%3C+std::numeric_limits%3Cdouble%3E::min()%0A++++++++++++++%3C%3C+!'%5Cn!'%3B%0A++++std::cout+%3C%3C+%22char+is+signed:+%22+%3C%3C+std::numeric_limits%3Cchar%3E::is_signed+%3C%3C+!'%5Cn!'%3B%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/01-types-operators-functions/numeric-limits.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-01-integer-literals]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%0Aint+main()+%7B%0A++++int+decimal+%3D+162%3B%0A++++int+octal+%3D+0242%3B%0A++++int+hexadecimal+%3D+0xA2%3B%0A++++int+binary+%3D+0b1010!'0010%3B%0A++++unsigned+long+population+%3D+1!'000!'000UL%3B%0A%0A++++std::cout+%3C%3C+decimal+%3C%3C+!'+!'+%3C%3C+octal+%3C%3C+!'+!'+%3C%3C+hexadecimal+%3C%3C+!'+!'+%3C%3C+binary+%3C%3C+!'%5Cn!'%3B%0A++++std::cout+%3C%3C+population+%3C%3C+!'%5Cn!'%3B%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/01-types-operators-functions/integer-literals.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-01-floating-literals]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%0Aint+main()+%7B%0A++++double+fraction+%3D+0.15%3B%0A++++float+single_precision+%3D+0.15F%3B%0A++++long+double+scientific+%3D+15E-2L%3B%0A++++double+large_value+%3D+1.5E6%3B%0A%0A++++std::cout+%3C%3C+fraction+%3C%3C+!'%5Cn!'%3B%0A++++std::cout+%3C%3C+single_precision+%3C%3C+!'%5Cn!'%3B%0A++++std::cout+%3C%3C+scientific+%3C%3C+!'%5Cn!'%3B%0A++++std::cout+%3C%3C+large_value+%3C%3C+!'%5Cn!'%3B%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/01-types-operators-functions/floating-point-literals.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-01-addition-function]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%0Aint+addition(int+left,+int+right)+%7B%0A++++return+left+%2B+right%3B%0A%7D%0A%0Aint+main()+%7B%0A++++int+result+%3D+addition(5,+3)%3B%0A++++std::cout+%3C%3C+result+%3C%3C+!'%5Cn!'%3B%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/01-types-operators-functions/addition-function.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-01-function-declaration]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%0Aint+maximum(int+left,+int+right)%3B%0A%0Aint+main()+%7B%0A++++int+result+%3D+maximum(10,+2)%3B%0A++++std::cout+%3C%3C+result+%3C%3C+!'%5Cn!'%3B%0A%0A++++return+0%3B%0A%7D%0A%0Aint+maximum(int+left,+int+right)+%7B%0A++++return+left+%3E+right+%3F+left+:+right%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/01-types-operators-functions/function-declaration-definition.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-01-void-function]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%0Avoid+print_message()+%7B%0A++++std::cout+%3C%3C+%22I!'m+a+function!!%5Cn%22%3B%0A%7D%0A%0Aint+main()+%7B%0A++++print_message()%3B%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/01-types-operators-functions/void-function.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-01-command-line-arguments]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%0Aint+main(int+argc,+char*+argv%5B%5D)+%7B%0A++++for+(int+index+%3D+0%3B+index+%3C+argc%3B+%2B%2Bindex)+%7B%0A++++++++std::cout+%3C%3C+argv%5Bindex%5D+%3C%3C+!'%5Cn!'%3B%0A++++%7D%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/01-types-operators-functions/command-line-arguments.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-01-factorial-recursive]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%0Aunsigned+long+long+factorial(unsigned+int+number)+%7B%0A++++if+(number+%3D%3D+0)+%7B%0A++++++++return+1%3B%0A++++%7D%0A%0A++++return+number+*+factorial(number+-+1)%3B%0A%7D%0A%0Aint+main()+%7B%0A++++std::cout+%3C%3C+factorial(5)+%3C%3C+!'%5Cn!'%3B%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/01-types-operators-functions/factorial-recursive.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-01-factorial-iterative]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%0Aunsigned+long+long+factorial(unsigned+int+number)+%7B%0A++++unsigned+long+long+result+%3D+1%3B%0A%0A++++for+(unsigned+int+factor+%3D+2%3B+factor+%3C%3D+number%3B+%2B%2Bfactor)+%7B%0A++++++++result+*%3D+factor%3B%0A++++%7D%0A%0A++++return+result%3B%0A%7D%0A%0Aint+main()+%7B%0A++++std::cout+%3C%3C+factorial(5)+%3C%3C+!'%5Cn!'%3B%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/01-types-operators-functions/factorial-iterative.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-01-name-shadowing]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%0Aint+x+%3D+0%3B%0Aint+y+%3D+0%3B%0A%0Avoid+print_local_values(double+x)+%7B%0A++++double+y+%3D+3.14%3B%0A++++std::cout+%3C%3C+%22local:+x+%3D+%22+%3C%3C+x+%3C%3C+%22,+y+%3D+%22+%3C%3C+y+%3C%3C+!'%5Cn!'%3B%0A%7D%0A%0Aint+main()+%7B%0A++++x+%3D+21%3B%0A++++y+%3D+239%3B%0A%0A++++%7B%0A++++++++int+x+%3D+10%3B%0A++++++++std::cout+%3C%3C+%22block:+x+%3D+%22+%3C%3C+x+%3C%3C+%22,+y+%3D+%22+%3C%3C+y+%3C%3C+!'%5Cn!'%3B%0A++++++++print_local_values(y)%3B%0A++++%7D%0A%0A++++std::cout+%3C%3C+%22global:+x+%3D+%22+%3C%3C+x+%3C%3C+%22,+y+%3D+%22+%3C%3C+y+%3C%3C+!'%5Cn!'%3B%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/01-types-operators-functions/name-shadowing.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-01-dangling-else]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%0Aint+main()+%7B%0A++++bool+outer_condition+%3D+false%3B%0A++++bool+inner_condition+%3D+false%3B%0A++++int+result+%3D+0%3B%0A%0A++++if+(outer_condition)%0A++++++++if+(inner_condition)%0A++++++++++++result+%3D+1%3B%0A++++else%0A++++++++result+%3D+2%3B%0A%0A++++std::cout+%3C%3C+%22result+%3D+%22+%3C%3C+result+%3C%3C+!'%5Cn!'%3B%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/01-types-operators-functions/dangling-else.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-01-dangling-else-fixed]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%0Aint+main()+%7B%0A++++bool+outer_condition+%3D+false%3B%0A++++bool+inner_condition+%3D+false%3B%0A++++int+result+%3D+0%3B%0A%0A++++if+(outer_condition)+%7B%0A++++++++if+(inner_condition)+%7B%0A++++++++++++result+%3D+1%3B%0A++++++++%7D%0A++++%7D+else+%7B%0A++++++++result+%3D+2%3B%0A++++%7D%0A%0A++++std::cout+%3C%3C+%22result+%3D+%22+%3C%3C+result+%3C%3C+!'%5Cn!'%3B%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/01-types-operators-functions/dangling-else-fixed.cpp" compiler="clang2310" options="-std=c++20 -O0" -->
