---
title: "Лекция 6. Ссылки, инициализация, функции и пространства имён"
---

::: {.content-visible unless-format="revealjs"}

[Открыть слайды](../slides/lectures/06-references-initialization-functions-namespaces.html){.btn .btn-outline-primary target="_blank"}

:::

## План лекции

- Ссылки: lvalue и rvalue
- Передача аргументов в функцию
- Перегрузка функций и `nullptr`
- Аргументы по умолчанию
- Формы инициализации
- Пространства имён и их псевдонимы

## 1. Ссылки

В лекции 3 `SwapValues` меняла значения местами через указатели. Но тип `int*` разрешает передать и `nullptr`:

```{.cpp filename="swap-null-pointer.cpp"}
{{< include ../examples/06-references-initialization-functions-namespaces/swap-null-pointer.cpp >}}
```

Программа падает намеренно: разыменование `nullptr` — неопределённое поведение, на практике — `Segmentation fault`.

## Проверять каждый раз?

```cpp
void SwapValues(int* left, int* right) {
    if (left == nullptr || right == nullptr) return;  // и что дальше?

    int temporary = *left;
    *left = *right;
    *right = temporary;
}
```

Проверка спасает от падения, но не отвечает на вопрос, что делать с нулевым указателем: молча выйти? сообщить об ошибке? А если `nullptr` здесь вообще не должно быть, хочется, чтобы это выражал сам тип параметра.

::: {.fragment}

Для этого в C++ есть ссылки.

:::

## Ссылка — второе имя объекта

- Ссылка — псевдоним уже существующего объекта
- Инициализируется при объявлении и до конца жизни связана с этим объектом
- Нулевой ссылки в корректной программе не бывает
- Как хранить ссылку, решает компилятор: в памяти её может не быть вовсе
- Указатель на ссылку сделать нельзя: `&j` — это адрес самого объекта
- `const`-ссылка может продлить время жизни временного объекта

## Ссылка в коде

```{.cpp filename="reference-basics.cpp"}
{{< include ../examples/06-references-initialization-functions-namespaces/reference-basics.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-06-reference-basics]{aria-label="Open in Compiler Explorer"}

`i` и `j` печатают один и тот же адрес: это одна и та же переменная.

## Ссылка и указатель в памяти

![Ссылка `j` — второе имя ячейки `i`; указатель `p` — отдельная переменная с адресом `i`](../assets/06-references-initialization-functions-namespaces/reference-vs-pointer-diagram.png)

Ссылка не создаёт нового объекта. Указатель — самостоятельная переменная: у неё свой адрес, и хранит она адрес `i`.

## `SwapValues` на ссылках

```{.cpp filename="swap-references.cpp"}
{{< include ../examples/06-references-initialization-functions-namespaces/swap-references.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-06-swap-references]{aria-label="Open in Compiler Explorer"}

При вызове не нужен `&`, внутри — `*`, а проверять на `nullptr` нечего: «отсутствие объекта» в ссылку не передать.

## Rvalue-ссылки

```cpp
int&& rv = 1;       // rvalue-ссылка: привязывается к временному объекту
const int& cr = 1;  // const-ссылке тоже можно, и временный объект живёт, пока жива cr
// int& lr = 1;     // error: non-const lvalue reference to type 'int'
//                  //        cannot bind to a temporary of type 'int'
```

Ссылки `T&`, которые мы разбирали, называют lvalue-ссылками. У `T&&` своя задача — семантика перемещения. Подробно разберём её в отдельной лекции.

## Висячая ссылка {.compact-code}

```{.cpp filename="dangling-reference.cpp"}
{{< include ../examples/06-references-initialization-functions-namespaces/dangling-reference.cpp >}}
```

Что напечатает программа?

::: {.fragment}

С `-O0` — **2**, а не 20. С `-O1` — 20, с `-O2` — мусор. Это неопределённое поведение: `x` ссылается на переменную, которой уже нет. Компилятор лишь предупреждает: `reference to stack memory associated with local variable 'i' returned`.

:::

::: {.notes}
Пример намеренно содержит неопределённое поведение, кнопки Compiler Explorer нет. Живой код: собрать с `-O0` и `-O2` и сравнить вывод. Числа выше получены на clang 18, arm64; на другом компиляторе результат может быть другим, вплоть до падения.
:::

## Почему 2, а не 20

![После возврата из `Foo` её кадр занимает `Boo`, и `x` видит чужую переменную](../assets/06-references-initialization-functions-namespaces/dangling-reference-diagram.png)

`Foo` и `Boo` вызываются из одного места `main`, поэтому их кадры ложатся на один и тот же участок стека. `x` всё ещё ссылается на ячейку, где жила `i` из `Foo`, а `Boo` записала туда свою `i = 2`. Та же история, что с висячим указателем в лекциях 3 и 5: не возвращайте ссылку или указатель на локальную переменную.

## 2. Передача аргументов в функцию

- **По значению** — функция получает копию
  - подходит для встроенных и небольших типов
- **По ссылке** — функция работает с исходным объектом
  - для больших объектов позволяет избежать копирования
- **По указателю** — функция получает копию адреса
  - объекта может не быть: `nullptr`

## Что получает функция

![](../assets/06-references-initialization-functions-namespaces/argument-passing-diagram.png){.tall-image fig-alt="По значению — копия объекта, по ссылке — сам объект, по указателю — копия адреса"}

## Как выбрать

```cpp
struct Image;  // большой объект: мегабайты пикселей

void Show(const Image& image);    // по const-ссылке: без копии, только чтение
void Blur(Image& image);          // по ссылке: меняет исходный объект
void SetLogo(const Image* logo);  // по указателю: логотипа может не быть
void SetZoom(int percent);        // по значению: int копировать дёшево
```

Небольшие типы — по значению. Большие — по `const&`, если функция только читает, и по `&`, если меняет. Указатель — когда объекта может не быть.

## Литерал в `const&` {.compact-code}

```{.cpp filename="const-reference-literal.cpp"}
{{< include ../examples/06-references-initialization-functions-namespaces/const-reference-literal.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-06-const-reference-literal]{aria-label="Open in Compiler Explorer"}

К `const&` можно привязать временный объект, поэтому функции можно передать литерал. Временный объект живёт до конца выражения с вызовом.

::: {.fragment}

Без `const` не получится: `void Increment(int& value)` не примет `Increment(5)` — `error: no matching function for call to 'Increment'`.

:::

## 3. Перегрузка функций: одно имя, разные параметры {.compact-code .tall-code}

```{.cpp filename="print-overloads.cpp"}
{{< include ../examples/06-references-initialization-functions-namespaces/print-overloads.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-06-print-overloads]{aria-label="Open in Compiler Explorer"}

::: {.notes}
Компилятор выбирает перегрузку по аргументам вызова.
:::

## Что напечатает `Print(20.1)`?

```cpp
Print(20.1);
```

Перегрузки те же: `Print()`, `Print(int)`, `Print(const char*)` и `Print(int, int)`.

::: {.fragment}

**20.** Перегрузки для `double` нет, и `20.1` неявно преобразуется в `int` с потерей дробной части. Clang предупреждает: `implicit conversion from 'double' to 'int' changes value from 20.1 to 20`.

:::

## Неоднозначный вызов

А если добавить перегрузку для `float`?

```cpp
void Print(int x);
void Print(float x);

int main() {
    Print(20.1);
}
```

::: {.fragment}

`error: call to 'Print' is ambiguous`. `20.1` — литерал типа `double`. Преобразования в `int` и во `float` для компилятора одинаково хороши, и выбрать одно он не может.

:::

::: {.notes}
Пример намеренно не компилируется.
:::

## Как помочь компилятору

```{.cpp filename="function-overload.cpp"}
{{< include ../examples/06-references-initialization-functions-namespaces/function-overload.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-06-function-overload]{aria-label="Open in Compiler Explorer"}

Литерал с суффиксом `F` имеет тип `float`. Это точное совпадение, и неоднозначность исчезает.

## Только возвращаемый тип — не перегрузка

```cpp
int Test(int value) {
    return value;
}

float Test(int value) {  // error: functions that differ only in their
    return value;        //        return type cannot be overloaded
}
```

Компилятор выбирает перегрузку по аргументам вызова. По вызову `Test(10)` не понять, какой результат нужен, поэтому разницы только в возвращаемом типе недостаточно.

::: {.notes}
Пример намеренно не компилируется.
:::

## `nullptr` и перегрузка

В лекции 3 `nullptr` помог выбрать между `Print(int)` и `Print(int*)`. А если обе перегрузки принимают указатели?

```cpp
void Print(const char* text);
void Print(int* number);

int main() {
    int* number = nullptr;
    Print(number);   // Print(int*)
    Print("aa");     // Print(const char*)
    Print(nullptr);  // ?
}
```

::: {.fragment}

`error: call to 'Print' is ambiguous`: `nullptr` преобразуется в любой указатель, и обе перегрузки подходят одинаково.

:::

::: {.notes}
Пример намеренно не компилируется.
:::

## `std::nullptr_t` {.compact-code .tall-code}

```{.cpp filename="nullptr-t-overload.cpp"}
{{< include ../examples/06-references-initialization-functions-namespaces/nullptr-t-overload.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-06-nullptr-t-overload]{aria-label="Open in Compiler Explorer"}

`nullptr` имеет тип `std::nullptr_t`, и перегрузка для него — точное совпадение.

## 4. Аргументы по умолчанию {.compact-code .tall-code}

Если аргумент не передан, подставляется значение по умолчанию:

```{.cpp filename="default-arguments.cpp"}
{{< include ../examples/06-references-initialization-functions-namespaces/default-arguments.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-06-default-arguments]{aria-label="Open in Compiler Explorer"}

## Разделитель по умолчанию

```{.cpp filename="default-argument.cpp"}
{{< include ../examples/06-references-initialization-functions-namespaces/default-argument.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-06-default-argument]{aria-label="Open in Compiler Explorer"}

Обычно по умолчанию задают самый частый вариант. Заодно вектор передаётся по `const&` — без копирования.

## 5. Инициализация

| Форма | Пример | Что получится |
|---|---|---|
| Default initialization | `int a;` | у локальной переменной значение не определено |
| Value initialization | `int b{};` | `0` |
| Direct initialization | `int c(2);` | `2` |
| Copy initialization | `int d = 2;` | `2` |
| List initialization | `std::string s{'a', 'b', 'c'};` | `"abc"` |
| Aggregate initialization | `Point p{1, 2};` | поля по порядку: `x = 1`, `y = 2` |

Подробнее — [cppreference](https://en.cppreference.com/w/cpp/language/initialization) и доклад Тимура Думлера «Initialisation in modern C++» на C++ Russia: <https://youtu.be/2jJumNzcp6Y>

## `int i();` — не переменная

```cpp
int i();  // объявление функции i без параметров, возвращающей int
int j{};  // переменная j со значением 0
```

Clang об этом предупреждает: `empty parentheses interpreted as a function declaration`. Для value initialization пишите `{}`.

::: {.notes}
Это частный случай most vexing parse: всё, что может быть прочитано как объявление функции, читается как объявление функции.
:::

## 6. Пространства имён

- Предотвращают конфликты имён
- Помогают организовать код
- Могут состоять из нескольких блоков, даже в разных файлах
- Бывают вложенными и безымянными, им можно давать псевдонимы

## Одинаковые имена в разных пространствах {.compact-code .tall-code}

```{.cpp filename="namespaces.cpp"}
{{< include ../examples/06-references-initialization-functions-namespaces/namespaces.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-06-namespaces]{aria-label="Open in Compiler Explorer"}

## `using namespace`

```cpp
using namespace foo;

int main() {
    Print();  // foo::Print
    boo::Print();
}
```

Директива `using namespace` делает имена из `foo` доступными без префикса.

## Конфликт имён

:::: {.columns}

::: {.column width="50%"}

```cpp
namespace foo {
void Print() {
    std::cout << "foo\n";
}
}  // namespace foo

namespace boo {
void Print() {
    std::cout << "boo\n";
}
}  // namespace boo
```

:::

::: {.column width="50%"}

```cpp
using namespace foo;
using namespace boo;

int main() {
    Print();  // ?
}
```

:::

::::

::: {.fragment}

`error: call to 'Print' is ambiguous`. Директивы открыли оба пространства, и защита от конфликта имён исчезла.

:::

::: {.notes}
Пример намеренно не компилируется. Здесь уместно сказать, почему `using namespace std;` в заголовочном файле — плохая идея: директива попадёт в каждый файл, который его подключает.
:::

## `using namespace` внутри функции

```cpp
int main() {
    using namespace foo;

    Print();  // foo::Print
    return 0;
}
```

Директива действует только до конца блока, в котором написана, и не открывает `foo` для остального файла.

## Вложенные пространства и псевдонимы

```{.cpp filename="nested-namespace.cpp" code-line-numbers="|3-9|12|14-15"}
{{< include ../examples/06-references-initialization-functions-namespaces/nested-namespace.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-06-nested-namespace]{aria-label="Open in Compiler Explorer"}

Псевдоним `sn` избавляет от длинного префикса и, как и `using namespace`, действует до конца блока.

## Вложенные пространства одной строкой

Начиная с C++17 не нужно открывать каждое пространство отдельным блоком:

```{.cpp filename="nested-namespace-cpp17.cpp"}
{{< include ../examples/06-references-initialization-functions-namespaces/nested-namespace-cpp17.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-06-nested-namespace-cpp17]{aria-label="Open in Compiler Explorer"}

`namespace foo::some_long_namespace_name { ... }` — то же самое, что два вложенных блока с прошлого слайда.

## Безымянное пространство имён

```{.cpp filename="unnamed-namespace.cpp"}
{{< include ../examples/06-references-initialization-functions-namespaces/unnamed-namespace.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-06-unnamed-namespace]{aria-label="Open in Compiler Explorer"}

Имена из безымянного пространства видны только внутри своего `.cpp`-файла. Другой файл программы может объявить свою `PrintMessage`, и при сборке они не столкнутся.

## Что напечатает программа? {.large-code .tall-code}

:::: {.columns}

::: {.column width="42%"}

```cpp
namespace {
int counter = 0;
}  // namespace

void Increment() {
    ++counter;
}

namespace a {
namespace {
int counter = 0;
}  // namespace

void Increment() {
    ++counter;
}
}  // namespace a
```

:::

::: {.column width="58%"}

```cpp
int main() {
    ++counter;
    Increment();
    a::Increment();

    std::cout << counter << '\n';
    std::cout << a::counter << '\n';
}
```

:::

::::

## Ответ: 2 и 1 {.large-code}

```cpp
int main() {
    ++counter;       // глобальный counter: 1
    Increment();     // глобальный counter: 2
    a::Increment();  // a::counter: 1

    std::cout << counter << '\n';     // 2
    std::cout << a::counter << '\n';  // 1
}
```

Безымянное пространство открывает свои имена для того пространства, в котором объявлено. Поэтому в `main` `counter` — глобальная переменная, а внутри `a` ближе оказывается своя `a::counter`: её и меняет `a::Increment`.

[godbolt-06-reference-basics]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%0Aint+main()+%7B%0A++++int+i+%3D+10%3B%0A++++int%26+j+%3D+i%3B++//+j+%E2%80%94+%D0%B2%D1%82%D0%BE%D1%80%D0%BE%D0%B5+%D0%B8%D0%BC%D1%8F+i%0A++++//+int%26+k%3B+++//+error:+declaration+of+reference+variable+!'k!'+requires+an+initializer%0A%0A++++j+%3D+20%3B++//+%D0%BF%D1%80%D0%B8%D1%81%D0%B2%D0%B0%D0%B8%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5+i,+%D0%B0+%D0%BD%D0%B5+%D0%BF%D0%B5%D1%80%D0%B5%D0%BF%D1%80%D0%B8%D0%B2%D1%8F%D0%B7%D0%BA%D0%B0+%D1%81%D1%81%D1%8B%D0%BB%D0%BA%D0%B8%0A++++std::cout+%3C%3C+i+%3C%3C+!'%5Cn!'%3B%0A++++std::cout+%3C%3C+%26i+%3C%3C+!'+!'+%3C%3C+%26j+%3C%3C+!'%5Cn!'%3B%0A%0A++++const+int%26+r+%3D+i%3B%0A++++//+r+%3D+21%3B++//+error:+cannot+assign+to+variable+!'r!'+with+const-qualified+type%0A++++std::cout+%3C%3C+r+%3C%3C+!'%5Cn!'%3B%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/06-references-initialization-functions-namespaces/reference-basics.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-06-swap-references]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%0Avoid+SwapValues(int%26+left,+int%26+right)+%7B%0A++++int+temporary+%3D+left%3B%0A++++left+%3D+right%3B%0A++++right+%3D+temporary%3B%0A%7D%0A%0Aint+main()+%7B%0A++++int+first+%3D+1%3B%0A++++int+second+%3D+2%3B%0A%0A++++SwapValues(first,+second)%3B%0A++++std::cout+%3C%3C+first+%3C%3C+!'+!'+%3C%3C+second+%3C%3C+!'%5Cn!'%3B%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/06-references-initialization-functions-namespaces/swap-references.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-06-print-overloads]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%0Avoid+Print()+%7B%0A++++std::cout+%3C%3C+!'%5Cn!'%3B%0A%7D%0A%0Avoid+Print(int+x)+%7B%0A++++std::cout+%3C%3C+x+%3C%3C+!'%5Cn!'%3B%0A%7D%0A%0Avoid+Print(const+char*+text)+%7B%0A++++std::cout+%3C%3C+text+%3C%3C+!'%5Cn!'%3B%0A%7D%0A%0Avoid+Print(int+x,+int+y)+%7B%0A++++std::cout+%3C%3C+x+%3C%3C+!'+!'+%3C%3C+y+%3C%3C+!'%5Cn!'%3B%0A%7D%0A%0Aint+main()+%7B%0A++++Print()%3B%0A++++Print(10)%3B%0A++++Print(%22Hello+world!!%22)%3B%0A++++Print(10,+20)%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/06-references-initialization-functions-namespaces/print-overloads.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-06-function-overload]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%0Avoid+Print(int+x)+%7B%0A++++std::cout+%3C%3C+%22int:+%22+%3C%3C+x+%3C%3C+!'%5Cn!'%3B%0A%7D%0A%0Avoid+Print(float+x)+%7B%0A++++std::cout+%3C%3C+%22float:+%22+%3C%3C+x+%3C%3C+!'%5Cn!'%3B%0A%7D%0A%0Aint+main()+%7B%0A++++Print(20)%3B+++++//+int+%E2%80%94+%D1%82%D0%BE%D1%87%D0%BD%D0%BE%D0%B5+%D1%81%D0%BE%D0%B2%D0%BF%D0%B0%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5%0A++++Print(20.1F)%3B++//+float+%E2%80%94+%D1%81%D1%83%D1%84%D1%84%D0%B8%D0%BA%D1%81+F+%D0%B4%D0%B5%D0%BB%D0%B0%D0%B5%D1%82+%D0%BB%D0%B8%D1%82%D0%B5%D1%80%D0%B0%D0%BB+float%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/06-references-initialization-functions-namespaces/function-overload.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-06-nullptr-t-overload]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ccstddef%3E%0A%23include+%3Ciostream%3E%0A%0Avoid+Print(const+char*+text)+%7B%0A++++std::cout+%3C%3C+%22const+char*:+%22+%3C%3C+text+%3C%3C+!'%5Cn!'%3B%0A%7D%0A%0Avoid+Print(int*+number)+%7B%0A++++std::cout+%3C%3C+%22int*:+%22+%3C%3C+*number+%3C%3C+!'%5Cn!'%3B%0A%7D%0A%0Avoid+Print(std::nullptr_t)+%7B%0A++++std::cout+%3C%3C+%22std::nullptr_t%5Cn%22%3B%0A%7D%0A%0Aint+main()+%7B%0A++++int+value+%3D+42%3B%0A++++Print(%26value)%3B%0A++++Print(%22aa%22)%3B%0A++++Print(nullptr)%3B%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/06-references-initialization-functions-namespaces/nullptr-t-overload.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-06-default-arguments]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%0Astruct+Point+%7B%0A++++int+x%3B%0A++++int+y%3B%0A%7D%3B%0A%0APoint+MakePoint(int+x+%3D+0,+int+y+%3D+0)+%7B%0A++++return+%7Bx,+y%7D%3B%0A%7D%0A%0Avoid+Print(Point+point)+%7B%0A++++std::cout+%3C%3C+!'(!'+%3C%3C+point.x+%3C%3C+%22,+%22+%3C%3C+point.y+%3C%3C+%22)%5Cn%22%3B%0A%7D%0A%0Aint+main()+%7B%0A++++Print(MakePoint(10,+20))%3B++//+(10,+20)%0A++++Print(MakePoint(10))%3B++++++//+(10,+0)%0A++++Print(MakePoint())%3B++++++++//+(0,+0)%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/06-references-initialization-functions-namespaces/default-arguments.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-06-default-argument]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%23include+%3Cvector%3E%0A%0Avoid+PrintVector(const+std::vector%3Cint%3E%26+values,+char+delimiter+%3D+!'+!')+%7B%0A++++for+(int+value+:+values)+%7B%0A++++++++std::cout+%3C%3C+value+%3C%3C+delimiter%3B%0A++++%7D%0A++++std::cout+%3C%3C+!'%5Cn!'%3B%0A%7D%0A%0Aint+main()+%7B%0A++++std::vector%3Cint%3E+values%7B1,+2,+3,+4,+5%7D%3B%0A++++PrintVector(values)%3B+++++++//+1+2+3+4+5%0A++++PrintVector(values,+!',!')%3B++//+1,2,3,4,5,%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/06-references-initialization-functions-namespaces/default-argument.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-06-namespaces]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%0Anamespace+foo+%7B%0Avoid+Print()+%7B%0A++++std::cout+%3C%3C+%22foo%5Cn%22%3B%0A%7D%0A%7D++//+namespace+foo%0A%0Anamespace+boo+%7B%0Avoid+Print()+%7B%0A++++std::cout+%3C%3C+%22boo%5Cn%22%3B%0A%7D%0A%7D++//+namespace+boo%0A%0Aint+main()+%7B%0A++++foo::Print()%3B%0A++++boo::Print()%3B%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/06-references-initialization-functions-namespaces/namespaces.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-06-nested-namespace]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%0Anamespace+foo+%7B%0Anamespace+some_long_namespace_name+%7B%0Avoid+Print()+%7B%0A++++std::cout+%3C%3C+%22foo::some_long_namespace_name::Print%5Cn%22%3B%0A%7D%0A%7D++//+namespace+some_long_namespace_name%0A%7D++//+namespace+foo%0A%0Aint+main()+%7B%0A++++foo::some_long_namespace_name::Print()%3B%0A%0A++++namespace+sn+%3D+foo::some_long_namespace_name%3B%0A++++sn::Print()%3B%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/06-references-initialization-functions-namespaces/nested-namespace.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-06-nested-namespace-cpp17]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%0Anamespace+foo::some_long_namespace_name+%7B%0Avoid+Print()+%7B%0A++++std::cout+%3C%3C+%22foo::some_long_namespace_name::Print%5Cn%22%3B%0A%7D%0A%7D++//+namespace+foo::some_long_namespace_name%0A%0Aint+main()+%7B%0A++++foo::some_long_namespace_name::Print()%3B%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/06-references-initialization-functions-namespaces/nested-namespace-cpp17.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-06-unnamed-namespace]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%0Anamespace+%7B%0Avoid+PrintMessage()+%7B%0A++++std::cout+%3C%3C+%22Unnamed+namespace+function%5Cn%22%3B%0A%7D%0A%7D++//+namespace%0A%0Aint+main()+%7B%0A++++PrintMessage()%3B%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/06-references-initialization-functions-namespaces/unnamed-namespace.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-06-const-reference-literal]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%23include+%3Cstring%3E%0A%0Avoid+PrintSquare(const+int%26+value)+%7B%0A++++std::cout+%3C%3C+value+*+value+%3C%3C+!'%5Cn!'%3B%0A%7D%0A%0Avoid+Greet(const+std::string%26+name)+%7B%0A++++std::cout+%3C%3C+%22Hello,+%22+%3C%3C+name+%3C%3C+%22!!%5Cn%22%3B%0A%7D%0A%0Aint+main()+%7B%0A++++PrintSquare(5)%3B++//+%D0%B2%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D0%BD%D1%8B%D0%B9+int+%D1%81%D0%BE+%D0%B7%D0%BD%D0%B0%D1%87%D0%B5%D0%BD%D0%B8%D0%B5%D0%BC+5%0A++++Greet(%22world%22)%3B++//+%D0%B2%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D0%BD%D0%B0%D1%8F+std::string+%D0%B8%D0%B7+%22world%22%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/06-references-initialization-functions-namespaces/const-reference-literal.cpp" compiler="clang2310" options="-std=c++20 -O0" -->
