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

## Результаты обучения

В этой лекции рассматриваются адреса памяти и работа с ними в C++. Мы разберём, как устроены указатели, почему массивы тесно связаны с адресной арифметикой, как представлены C-строки и как передавать функции через указатели.

После изучения материала вы сможете:

- получать адрес объекта и обращаться к значению по адресу;
- передавать объекты в функцию через указатели;
- различать нулевой указатель, `NULL` и `nullptr`;
- работать с массивами и C-строками;
- использовать `void*` и указатели на функции.

## 1. Указатели и адреса памяти

Указатель — это объект, который хранит адрес другой области памяти. Обычно тип указателя указывает, объект какого типа находится по этому адресу. Например, `int*` хранит адрес объекта типа `int`.

Специальное значение нулевого указателя означает, что указатель сейчас не связан ни с одним объектом.

![Переменные и адреса ячеек памяти](../assets/03-pointers-arrays/slide-02-image-01.png)

На схеме переменная `a` хранит адрес переменной `b`. Сам адрес — такое же значение, которое занимает память и может быть присвоено другому указателю.

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

## Нулевой указатель: `nullptr`, `0` и `NULL`

В современном C++ для нулевого указателя следует использовать `nullptr`. Это отдельный литерал типа `std::nullptr_t`, который не смешивается с целыми числами при выборе перегруженной функции.

```{.cpp filename="nullptr-overload.cpp"}
{{< include ../examples/03-pointers-arrays/nullptr-overload.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-03-nullptr-overload]{aria-label="Open in Compiler Explorer"}

`NULL` исторически использовался в C и старом C++, но чаще всего раскрывается в целочисленную константу. В новом коде предпочтителен `nullptr`.

## 2. Передача объектов через указатели

Аргументы функции по умолчанию передаются по значению. Функция получает копии и не может таким способом изменить исходные переменные:

```cpp
void SwapValues(int left, int right) {
    int temporary = left;
    left = right;
    right = temporary;
}
```

Чтобы изменить объекты вызывающего кода, можно передать их адреса:

```{.cpp filename="swap-through-pointers.cpp"}
{{< include ../examples/03-pointers-arrays/swap-through-pointers.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-03-swap-pointers]{aria-label="Open in Compiler Explorer"}

![Передача адресов переменных в функцию Swap](../assets/03-pointers-arrays/slide-10-image-01.png)

Параметры `left` и `right` хранят адреса исходных переменных. Оператор `*` позволяет функции изменить значения непосредственно по этим адресам.

В современном C++ для обязательных изменяемых параметров часто удобнее ссылки. Указатель полезен, когда отсутствие объекта допустимо и может быть выражено значением `nullptr`.

## 3. Массивы и адресная арифметика

Массив — это последовательность элементов одного типа, расположенных в памяти подряд. Размер встроенного массива задаётся при создании и не меняется. Индексация начинается с нуля.

```cpp
#include <iostream>

int main() {
    int uninitialized[10];
    int inferred[] = {1, 2, 3, 4, 5};
    int fixed[3] = {1, 2, 3};

    int matrix[2][3] = {
        {1, 2, 3},
        {4, 5, 6},
    };

    std::cout << inferred[0] << '\n';
    std::cout << matrix[1][2] << '\n';
}
```

![Последовательное размещение элементов массива](../assets/03-pointers-arrays/slide-17-image-01.png)

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

## Арифметика указателей

При прибавлении единицы указатель перемещается к следующему объекту своего типа, а не просто к следующему байту:

```cpp
int values[] = {10, 20, 30};

int* pointer = values;

int first = *pointer;         // 10
int second = *(pointer + 1);  // 20
int third = pointer[2];       // 30
```

![Связь индексов массива и арифметики указателей](../assets/03-pointers-arrays/slide-18-image-01.png)

Для допустимого индекса `i` выражения `values[i]`, `*(values + i)`, `pointer[i]` и `*(pointer + i)` эквивалентны.

Арифметика указателей определена только внутри одного массива и для позиции сразу после его последнего элемента. Разыменовывать позицию после массива нельзя.

## 4. C-строки

C-строка — это массив символов, завершённый нулевым символом `'\0'`. Этот символ позволяет функциям определить, где заканчивается строка.

![Представление C-строки в памяти](../assets/03-pointers-arrays/slide-20-image-01.png)

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

## Сравнение строк

Строки сравниваются посимвольно. Сравнивать сами указатели оператором `==` недостаточно: он проверит адреса, а не содержимое.

Вариант с индексами:

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

```cpp
int main() {
    int value = 2 << 10;
    PrintBytes(&value, sizeof(value));

    value = 239;
    PrintBytes(&value, sizeof(value));
}
```

Порядок байтов многобайтового числа зависит от платформы. На little-endian системах младший байт хранится по младшему адресу, а на big-endian — наоборот.

![Порядок байтов в little-endian и big-endian представлениях](../assets/03-pointers-arrays/slide-30-image-01.png)

## 6. Указатели на функции

Адрес можно получить не только у объекта, но и у функции. Тип указателя содержит тип возвращаемого значения и типы параметров:

```{.cpp filename="function-pointers.cpp"}
{{< include ../examples/03-pointers-arrays/function-pointers.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-03-function-pointers]{aria-label="Open in Compiler Explorer"}

Амперсанд при присваивании адреса функции необязателен: `Same` и `&Same` дают подходящий указатель.

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

Две функции с подходящей сигнатурой задают разные варианты сравнения:

```cpp
bool Less(int left, int right) {
    return left < right;
}

bool Greater(int left, int right) {
    return left > right;
}
```

Использование:

```cpp
#include <iostream>

int main() {
    int values[] = {1, 2, 3, 4, 5, 6, 7, 8};

    std::cout << *FindByOrder(values, 8, Less) << '\n';     // 8
    std::cout << *FindByOrder(values, 8, Greater) << '\n';  // 1
}
```

В современном C++ вместо обычного указателя на функцию также применяют функциональные объекты, лямбда-выражения и `std::function`.


[godbolt-03-pointer-addresses]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%0Aint+main()+%7B%0A++++int+value+%3D+10%3B%0A++++int*+pointer+%3D+%26value%3B%0A%0A++++std::cout+%3C%3C+%22%D0%90%D0%B4%D1%80%D0%B5%D1%81+value:+%22+%3C%3C+%26value+%3C%3C+!'%5Cn!'%3B%0A++++std::cout+%3C%3C+%22%D0%97%D0%BD%D0%B0%D1%87%D0%B5%D0%BD%D0%B8%D0%B5+pointer:+%22+%3C%3C+pointer+%3C%3C+!'%5Cn!'%3B%0A++++std::cout+%3C%3C+%22%D0%90%D0%B4%D1%80%D0%B5%D1%81+pointer:+%22+%3C%3C+%26pointer+%3C%3C+!'%5Cn!'%3B%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/03-pointers-arrays/pointer-addresses.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-03-pointer-sizes]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%0Aint+main()+%7B%0A++++bool+flag+%3D+true%3B%0A++++long+number+%3D+128L%3B%0A%0A++++bool*+flag_pointer+%3D+%26flag%3B%0A++++long*+number_pointer+%3D+%26number%3B%0A%0A++++std::cout+%3C%3C+sizeof(flag)+%3C%3C+!'+!'+%3C%3C+sizeof(number)+%3C%3C+!'%5Cn!'%3B%0A++++std::cout+%3C%3C+sizeof(flag_pointer)+%3C%3C+!'+!'+%3C%3C+sizeof(number_pointer)+%3C%3C+!'%5Cn!'%3B%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/03-pointers-arrays/pointer-sizes.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-03-multi-level-pointers]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%0Aint+main()+%7B%0A++++int+value+%3D+0%3B%0A++++int*+pointer+%3D+%26value%3B%0A++++int**+pointer_to_pointer+%3D+%26pointer%3B%0A++++int***+third_level+%3D+%26pointer_to_pointer%3B%0A%0A++++std::cout+%3C%3C+value+%3C%3C+!'%5Cn!'%3B%0A++++std::cout+%3C%3C+*pointer+%3C%3C+!'%5Cn!'%3B%0A++++std::cout+%3C%3C+**pointer_to_pointer+%3C%3C+!'%5Cn!'%3B%0A++++std::cout+%3C%3C+***third_level+%3C%3C+!'%5Cn!'%3B%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/03-pointers-arrays/multi-level-pointers.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-03-nullptr-overload]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%0Avoid+print(int*)+%7B%0A++++std::cout+%3C%3C+%22print(int*)%5Cn%22%3B%0A%7D%0A%0Avoid+print(int)+%7B%0A++++std::cout+%3C%3C+%22print(int)%5Cn%22%3B%0A%7D%0A%0Aint+main()+%7B%0A++++print(nullptr)%3B%0A++++print(0)%3B%0A%0A++++//+print(NULL)%3B+//+%D0%9C%D0%BE%D0%B6%D0%B5%D1%82+%D0%B1%D1%8B%D1%82%D1%8C+%D0%BD%D0%B5%D0%BE%D0%B4%D0%BD%D0%BE%D0%B7%D0%BD%D0%B0%D1%87%D0%BD%D0%BE:+NULL+%D0%BE%D0%B1%D1%8B%D1%87%D0%BD%D0%BE+%D1%8F%D0%B2%D0%BB%D1%8F%D0%B5%D1%82%D1%81%D1%8F+%D0%BC%D0%B0%D0%BA%D1%80%D0%BE%D1%81%D0%BE%D0%BC.%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/03-pointers-arrays/nullptr-overload.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-03-swap-pointers]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%0Avoid+swap_values(int*+left,+int*+right)+%7B%0A++++int+temporary+%3D+*left%3B%0A++++*left+%3D+*right%3B%0A++++*right+%3D+temporary%3B%0A%7D%0A%0Aint+main()+%7B%0A++++int+first+%3D+1%3B%0A++++int+second+%3D+2%3B%0A%0A++++swap_values(%26first,+%26second)%3B%0A++++std::cout+%3C%3C+first+%3C%3C+!'+!'+%3C%3C+second+%3C%3C+!'%5Cn!'%3B%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/03-pointers-arrays/swap-through-pointers.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-03-command-line]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%0Aint+main(int+argc,+char*+argv%5B%5D)+%7B%0A++++for+(int+index+%3D+0%3B+index+%3C+argc%3B+%2B%2Bindex)+%7B%0A++++++++std::cout+%3C%3C+argv%5Bindex%5D+%3C%3C+!'%5Cn!'%3B%0A++++%7D%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/03-pointers-arrays/command-line-arguments.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-03-function-pointers]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'int+same(int+value)+%7B%0A++++return+value%3B%0A%7D%0A%0Aint+main()+%7B%0A++++int+(*function)(int)+%3D+same%3B%0A++++int+(*same_function)(int)+%3D+%26same%3B%0A%0A++++return+function(2)+%2B+same_function(2)+%3D%3D+4+%3F+0+:+1%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/03-pointers-arrays/function-pointers.cpp" compiler="clang2310" options="-std=c++20 -O0" -->
