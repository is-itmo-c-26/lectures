---
title: "Лекция 3. Указатели, массивы и строки"
---

::: {.content-visible unless-format="revealjs"}

[Открыть слайды](../slides/lectures/03-pointers-arrays.html){.btn .btn-outline-primary target="_blank"}

:::

## План лекции

- Указатели, адреса памяти и `nullptr`
- Передача объектов через указатели
- Массивы и адресная арифметика
- C-строки и операции над ними
- `void*` и указатели на функции

## Модель памяти

Память — это очень длинный ряд одинаковых ячеек размером в один байт. Каждая ячейка пронумерована, и этот номер называется **адресом**. На машине с 512 ГБ памяти адреса идут от `0` до `549 755 813 887` (`0x7FFFFFFFFF`).

![Память — последовательность байтов, а байт — восемь битов](../assets/03-pointers-arrays/memory-model-diagram.png)

Байт состоит из 8 бит, каждый из которых равен `0` или `1` — всего 256 различных значений. Всё остальное — числа, символы, указатели — лишь способ интерпретировать эти байты.

Адреса принято записывать в шестнадцатеричной системе: одна цифра `0–F` кодирует ровно 4 бита, поэтому байт — это всегда две цифры, а адрес читается по границам байтов. `0x7FFFFFFFFF` куда удобнее, чем `549755813887`.

## Объекты в памяти

Любой объект занимает несколько идущих подряд байтов. **Адрес объекта** — это адрес его первого байта, а сколько байтов он занимает, говорит `sizeof`:

```cpp
long double value = 3.14L;

std::cout << sizeof(value) << '\n';  // 16 на x86-64 Linux
std::cout << &value << '\n';         // например, 0x7ffd3c2a1b40
```

![`long double` занимает 16 байт подряд; его адрес — адрес первого из них](../assets/03-pointers-arrays/object-in-memory-diagram.png)

## 1. Указатели и адреса памяти

Указатель — это объект, который хранит адрес другой области памяти. Обычно тип указателя указывает, объект какого типа находится по этому адресу. Например, `int*` хранит адрес объекта типа `int`.

![Переменная `a` хранит адрес переменной `b`](../assets/03-pointers-arrays/memory-address-diagram.png)

Сам адрес — такое же значение, которое занимает память и может быть присвоено другому указателю. Специальное значение нулевого указателя означает, что указатель сейчас не связан ни с одним объектом.

## Операторы `&` и `*`

Для базовой работы с указателями используются два унарных оператора:

- `&object` возвращает адрес объекта;
- `*pointer` разыменовывает указатель, то есть предоставляет доступ к объекту по хранящемуся адресу.

```cpp
int x = 1;
int y = 2;
int values[10];

int* pointer = &x;  // pointer хранит адрес x
y = *pointer;       // читаем x по адресу: y становится равен 1
*pointer = 0;       // изменяем x по адресу: x становится равен 0
pointer = &values[0];
```

Тип указателя важен: он определяет, как интерпретировать данные по адресу и на сколько байт сдвигаться при адресной арифметике.

> **Важно:** разыменовывать нулевой, неинициализированный или уже недействительный указатель нельзя. Это приводит к неопределённому поведению.

::: {.notes}
Живой код: набрать этот пример на глазах у зала, распечатать адрес через `&x`, разыменовать `*pointer`, изменить значение через указатель и показать, что `x` изменилась.
:::

## Адрес самого указателя

Указатель тоже является объектом и имеет собственный адрес. Поэтому выражения `pointer` и `&pointer` обозначают разные значения:

```{.cpp filename="pointer-addresses.cpp"}
{{< include ../examples/03-pointers-arrays/pointer-addresses.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-03-pointer-addresses]{aria-label="Open in Compiler Explorer"}

Первые два адреса будут одинаковыми: `pointer` указывает на `value`. Третий адрес относится к ячейке, в которой хранится сам указатель.

## Размер указателя

Размер объекта зависит от его типа, но размер указателя обычно определяется архитектурой процесса. Поэтому `bool*` и `long*` в одной программе, как правило, имеют одинаковый размер:

```{.cpp filename="pointer-sizes.cpp"}
{{< include ../examples/03-pointers-arrays/pointer-sizes.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-03-pointer-sizes]{aria-label="Open in Compiler Explorer"}

На распространённой 64-битной платформе оба указателя обычно занимают 8 байт. Стандарт C++ не фиксирует это значение, поэтому полагаться на конкретный размер без проверки не следует.

## Указатели на указатели

Если объектом по адресу является другой указатель, появляется дополнительный уровень косвенного доступа:

```{.cpp filename="multi-level-pointers.cpp"}
{{< include ../examples/03-pointers-arrays/multi-level-pointers.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-03-multi-level-pointers]{aria-label="Open in Compiler Explorer"}

## Указатели на указатели: в памяти

![Каждый указатель хранит адрес следующего звена; данные лежат только в последнем](../assets/03-pointers-arrays/multi-level-pointers-diagram.png)

`***third_level` — это три последовательных перехода по адресам. Каждая звёздочка в выражении снимает один уровень косвенности.

## Нулевой указатель: от `0` к `nullptr`

![Эволюция нулевого указателя](../assets/03-pointers-arrays/pointer-null-evolution.png){width="80%"}

Всё началось с обычного `0` — целого числа, которое неявно преобразуется в указатель. Затем появился макрос `NULL`, который лишь красиво называл всё тот же `0`. Ни `0`, ни `NULL` не имеют отдельного типа, поэтому указатель было легко перепутать с целым числом.

## `nullptr` и перегрузка функций {.compact-code}

В C++11 появился `nullptr` — отдельный литерал типа `std::nullptr_t`, который не смешивается с целыми числами при выборе перегруженной функции:

```{.cpp filename="nullptr-overload.cpp"}
{{< include ../examples/03-pointers-arrays/nullptr-overload.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-03-nullptr-overload]{aria-label="Open in Compiler Explorer"}

`NULL` по-прежнему компилируется, но чаще всего раскрывается в целочисленную константу — поэтому в новом коде предпочтителен `nullptr`.

## Ошибка на миллиард долларов

**Тони Хоар**, изобретатель null-ссылки (Algol W, 1965), в 2009 году публично назвал её своей «ошибкой на миллиард долларов».

::: {.fragment}

Реализовать её было слишком просто, а реальная цена — бесчисленные `NullPointerException` и segfault-ы за полвека — оказалась колоссальной.

:::

## Висячий указатель

```cpp
int* Make() {
    int local = 42;
    return &local;  // адрес переменной, которая вот-вот исчезнет
}

int main() {
    int* pointer = Make();
    std::cout << *pointer << '\n';  // неопределённое поведение
}
```

`pointer` не равен `nullptr` — он выглядит совершенно нормальным. Но `local` уничтожается сразу после выхода из `Make`, и адрес указывает на память, которая программе больше не принадлежит.

## Куда указывает `pointer`

![Стековый кадр `Make` разрушен, а указатель всё ещё хранит старый адрес](../assets/03-pointers-arrays/dangling-pointer-diagram.png){width="58%"}

Разыменование такого указателя опаснее очевидного `nullptr`: программа может «случайно» сработать правильно и сломаться только через раз.

::: {.fragment}

Сырые указатели — это фундамент, но не то, чем стоит управлять памятью в реальном коде. В следующих лекциях: `std::unique_ptr`, `std::shared_ptr` и RAII — указатели остаются, а ручное управление их временем жизни уходит в прошлое.

:::

## 2. Передача объектов через указатели

Аргументы функции по умолчанию передаются по значению. Функция получает копии и не может таким способом изменить исходные переменные:

```cpp
void SwapValues(int left, int right) {
    int temporary = left;
    left = right;
    right = temporary;
}
```

После вызова `SwapValues(first, second)` переменные `first` и `second` останутся прежними: функция поменяла местами только свои копии.

::: {.notes}
Живой код: сначала показать `SwapValues` без указателей и распечатать, что значения не поменялись, потом переписать её с указателями прямо на глазах и показать, что теперь работает. Контраст «до/после» вживую заходит сильнее, чем на слайде.
:::

## Передача адресов

Чтобы изменить объекты вызывающего кода, можно передать их адреса:

```{.cpp filename="swap-through-pointers.cpp"}
{{< include ../examples/03-pointers-arrays/swap-through-pointers.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-03-swap-pointers]{aria-label="Open in Compiler Explorer"}

Параметры `left` и `right` хранят адреса исходных переменных. Оператор `*` позволяет функции изменить значения непосредственно по этим адресам.

## Что происходит в памяти

![Параметры функции хранят адреса переменных из `main`](../assets/03-pointers-arrays/swap-through-pointers-diagram.png){width="72%"}

В современном C++ для обязательных изменяемых параметров часто удобнее ссылки. Указатель полезен, когда отсутствие объекта допустимо и может быть выражено значением `nullptr`.

## 3. Массивы

Массив — это последовательность элементов одного типа, расположенных в памяти подряд. Размер встроенного массива задаётся при создании и не меняется. Индексация начинается с нуля.

```cpp
int uninitialized[10];         // значения не определены
int inferred[] = {1, 2, 3, 4, 5};
int fixed[3] = {1, 2, 3};

int matrix[2][3] = {
    {1, 2, 3},
    {4, 5, 6},
};

std::cout << inferred[0] << '\n';   // 1
std::cout << matrix[1][2] << '\n';  // 6
```

## Массив в памяти

![Элементы лежат подряд, без промежутков](../assets/03-pointers-arrays/array-memory-layout-diagram.png)

Адрес элемента `inferred[i]` — это адрес первого элемента плюс `i * sizeof(int)`. Именно это свойство делает возможной адресную арифметику.

## Преобразование массива в указатель

В большинстве выражений имя массива преобразуется в указатель на первый элемент:

```cpp
int values[10];

int* first = &values[0];
int* same_first = values;
```

Оба указателя содержат один адрес. Значение первого элемента можно получить несколькими эквивалентными способами:

```cpp
int value1 = values[0];
int value2 = *values;
int value3 = *first;
```

> **Важно:** массив и указатель — разные типы объектов. Массив хранит все свои элементы, а указатель хранит только адрес. Преобразование массива в указатель происходит лишь в определённых выражениях.

## Ловушка: `sizeof` массива-параметра

```cpp
std::size_t Count(int array[]) {
    return sizeof(array) / sizeof(array[0]);
}

int main() {
    int values[10];
    std::cout << Count(values) << '\n';                       // 2 (не 10!)
    std::cout << sizeof(values) / sizeof(values[0]) << '\n';  // 10
}
```

Внутри `Count` параметр `array` уже стал указателем `int*`: `sizeof(array)` — это размер указателя (обычно 8 байт), а не размер исходного массива.

::: {.notes}
Живой код: напечатать `Count(values)` без подсказки на слайде, чтобы «2 вместо 10» стало неожиданностью для зала, а не текстом, который они уже прочитали.
:::

## Почему `Count` видит только 8 байт

![Массив в `main` против указателя внутри функции](../assets/03-pointers-arrays/sizeof-array-trap-diagram.png){width="80%"}

Трюк `sizeof(values) / sizeof(values[0])` работает только там, где массив ещё остаётся массивом — то есть до того, как он стал параметром функции. Поэтому размер обычно передают отдельным аргументом.

## Арифметика указателей {.compact-code}

При прибавлении единицы указатель перемещается к следующему объекту своего типа, а не просто к следующему байту:

```cpp
int values[] = {10, 20, 30};

int* pointer = values;

int first = *pointer;         // 10
int second = *(pointer + 1);  // 20
int third = pointer[2];       // 30
```

![](../assets/03-pointers-arrays/pointer-arithmetic-diagram.png){width="68%"}

Для допустимого индекса `i` выражения `values[i]`, `*(values + i)`, `pointer[i]` и `*(pointer + i)` эквивалентны.

## Границы арифметики указателей

Арифметика указателей определена только внутри одного массива и для позиции сразу после его последнего элемента. Разыменовывать позицию после массива нельзя.

::: {.fragment}

Именно эта ошибка — чтение памяти за пределами буфера — стала причиной **Heartbleed** (CVE-2014-0160, 2014): OpenSSL не проверял, что заявленная длина запроса соответствует реальному размеру буфера, и в ответ утекали случайные соседние байты памяти сервера, включая приватные ключи. Один из самых дорогих багов в истории интернета.

:::

## 4. C-строки

C-строка — это массив символов, завершённый нулевым символом `'\0'`. Этот символ позволяет функциям определить, где заканчивается строка.

![Представление C-строки в памяти](../assets/03-pointers-arrays/c-string-memory-diagram.png)

Длина строки нигде не хранится отдельно: единственный способ узнать её — дойти до `'\0'`.

## Строковые литералы

Строковый литерал в C++ имеет тип массива константных символов. Поэтому указатель на литерал должен быть `const char*`:

```cpp
const char* first = "Hello world";
char second[] = "Hello world";
const char* third = second;
```

`first` указывает на строковый литерал, который нельзя изменять. `second` является отдельным изменяемым массивом, куда символы литерала были скопированы.

## Длина строки

Длину C-строки можно найти, перемещая указатель до нулевого символа:

```cpp
#include <cstddef>

std::size_t StringLength(const char* string) {
    std::size_t length = 0;

    while (*string != '\0') {
        ++string;
        ++length;
    }

    return length;
}
```

Функция предполагает, что ей передан корректный ненулевой указатель на строку, содержащую завершающий символ `'\0'`.

::: {.notes}
Живой код: писать `StringLength` пошагово, проговаривая на каждой итерации, где сейчас находится указатель и что лежит по этому адресу.
:::

## Сравнение строк: через индексы

Строки сравниваются посимвольно. Сравнивать сами указатели оператором `==` недостаточно: он проверит адреса, а не содержимое.

```cpp
int StringCompare(const char* first, const char* second) {
    std::size_t index = 0;

    while (first[index] != '\0' && second[index] != '\0') {
        if (first[index] != second[index]) {
            return first[index] < second[index] ? -1 : 1;
        }
        ++index;
    }

    if (first[index] == second[index]) return 0;
    return first[index] < second[index] ? -1 : 1;
}
```

## Сравнение строк: через указатели

Ту же операцию можно выразить через арифметику указателей:

```cpp
int StringCompare(const char* first, const char* second) {
    while (*first != '\0' && *first == *second) {
        ++first;
        ++second;
    }

    return static_cast<unsigned char>(*first) - static_cast<unsigned char>(*second);
}
```

Обе реализации возвращают ноль для равных строк, отрицательное значение, если первая строка должна идти раньше, и положительное — в обратном случае.

## Почему C-строки считаются опасными

- У функции `gets()` не было параметра размера буфера — проверить границы при чтении было невозможно в принципе
- В 1988 году червь Морриса заразил тысячи компьютеров через переполнение буфера в `fingerd`, эксплуатируя ровно эту особенность работы с C-строками
- В стандарте **C11** `gets()` не просто помечена устаревшей — она полностью удалена из библиотеки. Это первый случай, когда функцию целиком убрали из стандартной библиотеки C

## Аргументы командной строки

В традиционной форме `main` получает количество аргументов и массив указателей на строки:

```{.cpp filename="command-line-arguments.cpp"}
{{< include ../examples/03-pointers-arrays/command-line-arguments.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-03-command-line]{aria-label="Open in Compiler Explorer"}

`argc` содержит количество аргументов, а `argv[index]` указывает на C-строку с соответствующим аргументом.

## 5. Универсальный указатель `void*`

Указатель `void*` может хранить адрес объекта любого типа. Информация о типе объекта при этом теряется, поэтому разыменовать `void*` напрямую нельзя.

```cpp
int value = 239;
int* typed_pointer = &value;

void* untyped_pointer = typed_pointer;
int* restored_pointer = static_cast<int*>(untyped_pointer);
```

Адрес при преобразовании не меняется. Меняется только информация, которую компилятор использует для интерпретации данных.

> **Важно:** программист обязан восстановить правильный тип. Приведение к несовместимому типу с последующим чтением может привести к неопределённому поведению.

## Просмотр объекта как последовательности байтов

Любой объект можно исследовать как последовательность байтов. Для этого удобно привести адрес к указателю на `std::uint8_t`:

```cpp
#include <cstddef>
#include <cstdint>
#include <format>
#include <iostream>

void PrintBytes(const void* object, std::size_t size) {
    const auto* bytes = static_cast<const std::uint8_t*>(object);

    for (std::size_t index = 0; index < size; ++index) {
        std::cout << std::format("{:08b} ", bytes[index]);
    }

    std::cout << '\n';
}
```

Функция `std::format` появилась в C++20. Прибавление единицы к `bytes` или увеличение индекса перемещает чтение на один байт.

## Порядок байтов

```cpp
int main() {
    int value = 2 << 10;  // 2048 = 0x00000800
    PrintBytes(&value, sizeof(value));
}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-03-print-bytes]{aria-label="Open in Compiler Explorer"} <!-- inline snippet: kept in place by update-godbolt-links.mjs -->



Порядок байтов многобайтового числа зависит от платформы. На little-endian системах младший байт хранится по младшему адресу, а на big-endian — наоборот.

![Одно и то же число в памяти little-endian и big-endian машин](../assets/03-pointers-arrays/endianness-diagram.png){width="60%"}

## Остроконечники и тупоконечники

Термины «little-endian» и «big-endian» — прямая цитата из «Путешествий Гулливера»: лилипуты воевали из-за того, с какого конца разбивать варёное яйцо.

::: {.fragment}

Дэнни Коэн в 1980 году в статье «On Holy Wars and a Plea for Peace» позаимствовал эту метафору для споров о порядке байтов — они, как и войны остроконечников с тупоконечниками, почти никогда не имеют объективно правильной стороны.

:::

## Код — это тоже байты

В **архитектуре фон Неймана** (1945) инструкции программы и её данные хранятся в одной и той же памяти и адресуются одинаково. Скомпилированный код функции — просто последовательность байтов, у которой, как у любого объекта, есть адрес первого байта.

![Код функции лежит в той же памяти, что и данные](../assets/03-pointers-arrays/von-neumann-diagram.png)

::: {.fragment}

Альтернатива — **Гарвардская архитектура**: код и данные в физически разных памятях (микроконтроллеры, Arduino). Там адрес функции — уже другой «сорт» адреса, и в один указатель с данными его не положить.

:::

::: {.fragment}

Оборотная сторона: если код и данные неразличимы, данные можно *исполнить* — ровно на этом стояли червь Морриса и весь класс stack-smashing атак. Отсюда современные защиты вроде NX-бита: страница памяти либо записываемая, либо исполняемая, но не обе сразу.

:::

## 6. Указатели на функции

Раз у функции есть адрес, его можно получить и сохранить — так же, как адрес объекта. Тип указателя содержит тип возвращаемого значения и типы параметров:

```{.cpp filename="function-pointers.cpp"}
{{< include ../examples/03-pointers-arrays/function-pointers.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-03-function-pointers]{aria-label="Open in Compiler Explorer"}

Амперсанд при присваивании адреса функции необязателен: `Same` и `&Same` дают подходящий указатель.

## Указатель на функцию как стратегия

Указатель на функцию можно передать как стратегию поведения. Следующая функция выбирает элемент массива согласно переданному отношению порядка:

```cpp
#include <cstddef>

int* FindByOrder(int* array, std::size_t size, bool (*comes_before)(int, int)) {
    if (size == 0) return nullptr;

    int* result = array;

    for (std::size_t index = 1; index < size; ++index) {
        if (comes_before(*result, array[index])) {
            result = &array[index];
        }
    }

    return result;
}
```

## Одна функция — разные стратегии

Две функции с подходящей сигнатурой задают разные варианты сравнения:

```cpp
bool Less(int left, int right) {
    return left < right;
}

bool Greater(int left, int right) {
    return left > right;
}

int main() {
    int values[] = {1, 2, 3, 4, 5, 6, 7, 8};

    std::cout << *FindByOrder(values, 8, Less) << '\n';     // 8
    std::cout << *FindByOrder(values, 8, Greater) << '\n';  // 1
}
```

В современном C++ вместо обычного указателя на функцию также применяют функциональные объекты, лямбда-выражения и `std::function`.

## Настоящий кошмар: `signal`

```cpp
void (*signal(int signal_number, void (*handler)(int)))(int);
```

Так объявлена функция `signal` в заголовке `<csignal>` стандартной библиотеки C.

::: {.fragment}

Она принимает номер сигнала и указатель на функцию-обработчик, а возвращает указатель на предыдущий обработчик — то есть указатель на функцию, возвращающую указатель на функцию.

Расшифровывать подобные объявления помогает «spiral rule» (двигаться от имени по спирали наружу) или онлайн-инструмент [cdecl.org](https://cdecl.org).

:::

## Кошмар своими руками {.compact-code}

Вкладывать указатели на функции можно сколько угодно — компилятор не возражает:

```cpp
long (*(*monster)(char (*)(int (*)(short (*)(double)))))(bool);
```

`monster` — указатель на функцию, которая принимает указатель на функцию, которая принимает указатель на функцию, которая принимает указатель на функцию из `double` в `short`, — и возвращает указатель на функцию из `bool` в `long`.

::: {.fragment}

Единственный способ жить с таким типом — разобрать его на псевдонимы:

```cpp
using Leaf = short (*)(double);
using Inner = int (*)(Leaf);
using Handler = char (*)(Inner);
using Result = long (*)(bool);

Result (*readable)(Handler);  // тот же тип, что у monster
```

:::


[godbolt-03-pointer-addresses]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%0Aint+main()+%7B%0A++++int+value+%3D+10%3B%0A++++int*+pointer+%3D+%26value%3B%0A%0A++++std::cout+%3C%3C+%22%D0%90%D0%B4%D1%80%D0%B5%D1%81+value:+%22+%3C%3C+%26value+%3C%3C+!'%5Cn!'%3B%0A++++std::cout+%3C%3C+%22%D0%97%D0%BD%D0%B0%D1%87%D0%B5%D0%BD%D0%B8%D0%B5+pointer:+%22+%3C%3C+pointer+%3C%3C+!'%5Cn!'%3B%0A++++std::cout+%3C%3C+%22%D0%90%D0%B4%D1%80%D0%B5%D1%81+pointer:+%22+%3C%3C+%26pointer+%3C%3C+!'%5Cn!'%3B%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/03-pointers-arrays/pointer-addresses.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-03-pointer-sizes]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%0Aint+main()+%7B%0A++++bool+flag+%3D+true%3B%0A++++long+number+%3D+128L%3B%0A%0A++++bool*+flag_pointer+%3D+%26flag%3B%0A++++long*+number_pointer+%3D+%26number%3B%0A%0A++++std::cout+%3C%3C+sizeof(flag)+%3C%3C+!'+!'+%3C%3C+sizeof(number)+%3C%3C+!'%5Cn!'%3B%0A++++std::cout+%3C%3C+sizeof(flag_pointer)+%3C%3C+!'+!'+%3C%3C+sizeof(number_pointer)+%3C%3C+!'%5Cn!'%3B%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/03-pointers-arrays/pointer-sizes.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-03-multi-level-pointers]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%0Aint+main()+%7B%0A++++int+value+%3D+0%3B%0A++++int*+pointer+%3D+%26value%3B%0A++++int**+pointer_to_pointer+%3D+%26pointer%3B%0A++++int***+third_level+%3D+%26pointer_to_pointer%3B%0A%0A++++std::cout+%3C%3C+value+%3C%3C+!'%5Cn!'%3B%0A++++std::cout+%3C%3C+*pointer+%3C%3C+!'%5Cn!'%3B%0A++++std::cout+%3C%3C+**pointer_to_pointer+%3C%3C+!'%5Cn!'%3B%0A++++std::cout+%3C%3C+***third_level+%3C%3C+!'%5Cn!'%3B%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/03-pointers-arrays/multi-level-pointers.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-03-nullptr-overload]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%0Avoid+Print(int*)+%7B%0A++++std::cout+%3C%3C+%22Print(int*)%5Cn%22%3B%0A%7D%0A%0Avoid+Print(int)+%7B%0A++++std::cout+%3C%3C+%22Print(int)%5Cn%22%3B%0A%7D%0A%0Aint+main()+%7B%0A++++Print(nullptr)%3B%0A++++Print(0)%3B%0A%0A++++//+Print(NULL)%3B+//+%D0%9C%D0%BE%D0%B6%D0%B5%D1%82+%D0%B1%D1%8B%D1%82%D1%8C+%D0%BD%D0%B5%D0%BE%D0%B4%D0%BD%D0%BE%D0%B7%D0%BD%D0%B0%D1%87%D0%BD%D0%BE:+NULL+%D0%BE%D0%B1%D1%8B%D1%87%D0%BD%D0%BE+%D1%8F%D0%B2%D0%BB%D1%8F%D0%B5%D1%82%D1%81%D1%8F+%D0%BC%D0%B0%D0%BA%D1%80%D0%BE%D1%81%D0%BE%D0%BC.%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/03-pointers-arrays/nullptr-overload.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-03-swap-pointers]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%0Avoid+SwapValues(int*+left,+int*+right)+%7B%0A++++int+temporary+%3D+*left%3B%0A++++*left+%3D+*right%3B%0A++++*right+%3D+temporary%3B%0A%7D%0A%0Aint+main()+%7B%0A++++int+first+%3D+1%3B%0A++++int+second+%3D+2%3B%0A%0A++++SwapValues(%26first,+%26second)%3B%0A++++std::cout+%3C%3C+first+%3C%3C+!'+!'+%3C%3C+second+%3C%3C+!'%5Cn!'%3B%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/03-pointers-arrays/swap-through-pointers.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-03-command-line]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%0Aint+main(int+argc,+char*+argv%5B%5D)+%7B%0A++++for+(int+index+%3D+0%3B+index+%3C+argc%3B+%2B%2Bindex)+%7B%0A++++++++std::cout+%3C%3C+argv%5Bindex%5D+%3C%3C+!'%5Cn!'%3B%0A++++%7D%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/03-pointers-arrays/command-line-arguments.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-03-function-pointers]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'int+Same(int+value)+%7B%0A++++return+value%3B%0A%7D%0A%0Aint+main()+%7B%0A++++int+(*function)(int)+%3D+Same%3B%0A++++int+(*same_function)(int)+%3D+%26Same%3B%0A%0A++++return+function(2)+%2B+same_function(2)+%3D%3D+4+%3F+0+:+1%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/03-pointers-arrays/function-pointers.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-03-print-bytes]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ccstddef%3E%0A%23include+%3Ccstdint%3E%0A%23include+%3Cformat%3E%0A%23include+%3Ciostream%3E%0A%0Avoid+PrintBytes(const+void*+object,+std::size_t+size)+%7B%0A++++const+auto*+bytes+%3D+static_cast%3Cconst+std::uint8_t*%3E(object)%3B%0A%0A++++for+(std::size_t+index+%3D+0%3B+index+%3C+size%3B+%2B%2Bindex)+%7B%0A++++++++std::cout+%3C%3C+std::format(%22%7B:08b%7D+%22,+bytes%5Bindex%5D)%3B%0A++++%7D%0A%0A++++std::cout+%3C%3C+!'%5Cn!'%3B%0A%7D%0A%0Aint+main()+%7B%0A++++int+value+%3D+2+%3C%3C+10%3B++//+2048+%3D+0x00000800%0A++++PrintBytes(%26value,+sizeof(value))%3B%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/03-pointers-arrays/print-bytes.cpp" compiler="clang2310" options="-std=c++20 -O0" -->
