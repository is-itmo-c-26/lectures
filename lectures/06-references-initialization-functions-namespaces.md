---
title: "Лекция 6. Ссылки, инициализация, функции и пространства имён"
---

::: {.content-visible unless-format="revealjs"}

[Открыть слайды](../slides/lectures/06-references-initialization-functions-namespaces.html){.btn .btn-outline-primary target="_blank"}

:::

## План лекции

- Lvalue- и rvalue-ссылки
- Способы передачи аргументов в функции
- Перегрузка функций и аргументы по умолчанию
- Формы инициализации и значение `nullptr`
- Пространства имён и их псевдонимы

## Ссылки (reference)


```cpp
void swap(int* pi, int* pj) {
    int temp = *pi;
    *pi = *pj;
    *pj = temp;
}
```

## Ссылки (reference)


Этот пример не компилируется: `swap` ожидает указатель, а `i` имеет тип `int`. Вызов `swap(&i, nullptr)` с этой реализацией приводит к неопределённому поведению.

```cpp
void swap(int* pi, int* pj) {
    int temp = *pi;
    *pi = *pj;
    *pj = temp;
}

int main() {
    int i = 10;
    swap(i, nullptr);

    return 0;
}
```

- Семантика указателя позволяет ему быть нулевым

## Ссылки (reference)


```cpp
void swap(int* pi, int* pj) {
    if (pi == nullptr || pj == nullptr) return;  // ????

    int temp = *pi;
    *pi = *pj;
    *pj = temp;
}
```

- Семантика указателя позволяет ему быть нулевым

## Reference (lvalue reference)


- “Псевдоним” для уже существующего объекта
- Ссылка должна быть инициализирована при объявлении
- Ссылка — псевдоним объекта; способ её хранения зависит от реализации
- Нельзя сделать указатель на ссылку
- `const`-ссылка может продлевать время жизни временного объекта

## Reference


```cpp
int main() {
    int i = 10;
    int& j = i;
    // int& k;  // error: ‘k’ declared as reference but not initialized
    j = 20;
    std::cout << i << std::endl;
    std::cout << &i << "  " << &j << std::endl;

    const int& r = i;
    // r = 21; // error assignment of read-only reference ‘r’
    return 0;
}
```

## Reference


```{.cpp filename="swap-references.cpp"}
{{< include ../examples/06-references-initialization-functions-namespaces/swap-references.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-06-swap-references]{aria-label="Open in Compiler Explorer"}

## Rvalue reference


```cpp
int&& rv = 1;
```

- // soon...

## Reference


Опасный пример: функция возвращает ссылку на локальный объект. Использование этой ссылки после возврата из функции приводит к неопределённому поведению.

```cpp
int& foo() {
    int i = 20;
    return i;
}

int boo() {
    int i = 2;
    return i;
}

int main() {
    int& x = foo();
    boo();

    std::cout << x;  // !OOps
    return 0;
}
```

## Reference


Опасный пример: функция возвращает ссылку на локальный объект. Использование этой ссылки после возврата из функции приводит к неопределённому поведению.

```cpp
int& foo() {
    int i = 20;
    return i;  // reference to stack memory associated with local variable 'i' returned
}

int boo() {
    int i = 2;
    return i;
}

int main() {
    int& x = foo();
    boo();

    std::cout << x;  // !OOps
    return 0;
}
```

- Чаще всего компилятор выдаст только warning

## Передача аргументов в функцию


- By reference
- Для больших объектов обычно позволяет избежать копирования
- By pointer
- By value
- Для встроенных и небольших типов

## Передача аргументов в функцию


```cpp
struct SomeStruct;
```

- void funcA(const SomeStruct& value); // by reference
- void funcB(SomeStruct& value);       // by reference
- void funcC(SomeStruct* value);       // by pointer
- void funcD(int value);               // by value

## Перегрузка функций


```cpp
void print() {
    std::cout << std::endl;
}

void print(int x) {
    std::cout << x << std::endl;
}

void print(const char* str) {
    std::cout << str << std::endl;
}

void print(int x, int y) {
    std::cout << x << " " << y << std::endl;
}
```

## Перегрузка функций


```cpp
int main() {
    print();
    print(10);
    print("Hello world!");
    print(10, 20);
    print(20.1);

    return 0;
}
```

## Перегрузка функций


Пример намеренно не компилируется: вызов неоднозначен между перегрузками для `int` и `float`.

```cpp
void print(int x) {
    std::cout << x << std::endl;
}

void print(float x) {
    std::cout << x << std::endl;
}

int main() {
    print(20.1);
    return 0;
}
```

## Перегрузка функций


Пример намеренно не компилируется: вызов неоднозначен между перегрузками для `int` и `float`.

```cpp
void print(int x) {
    std::cout << x << std::endl;
}

void print(float x) {
    std::cout << x << std::endl;
}

int main() {
    print(20.1);  // error: call to 'print' is ambiguous
    return 0;
}
```

## Перегрузка функций


```{.cpp filename="function-overload.cpp"}
{{< include ../examples/06-references-initialization-functions-namespaces/function-overload.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-06-function-overload]{aria-label="Open in Compiler Explorer"}

## Перегрузка функций


Пример намеренно не компилируется: функции нельзя перегружать только по возвращаемому типу.

```cpp
int test(int i) {
    return i;
}

float test(int f) {  //  error: ambiguating new declaration of ‘float test(int)’
    return (float)f;
}

int main() {
    test(10.2f);
    return 0;
}
```

## nullptr


```cpp
void func(int a) {
    std::cout << "int" << std::endl;
}

void func(const char* str) {
    std::cout << "char*" << std::endl;
}

int main() {
    func(10);    // int
    func("aa");  // char*
    // func(NULL);    // call is ambiguous
    func(0);        // int
    func(nullptr);  // char*
}
```

## nullptr


Пример намеренно не компилируется в C++20: строковый литерал нельзя передать как `char*`, а вызов с `nullptr` неоднозначен.

```cpp
void func(char* str) {
    std::cout << "char*" << std::endl;
}

void func(int* i) {
    std::cout << "int*" << std::endl;
}

int main() {
    int* i = nullptr;
    func(i);        // int*
    func("aa");     // char*
    func(nullptr);  // call is ambiguous
}
```

## nullptr


```cpp
void func(const char* str) {
    std::cout << "char*" << std::endl;
}

void func(int* i) {
    std::cout << "int*" << std::endl;
}

void func(std::nullptr_t null_pointer) {
    std::cout << "std::nullptr_t" << std::endl;
}
```

## Аргументы по умолчанию


```cpp
struct SPoint {
    int x;
    int y;
};
SPoint make_point(int x = 0, int y = 0) {
    return {x, y};
}

int main(int argc, char const* argv[]) {
    SPoint p1 = make_point(10, 20);
    SPoint p2 = make_point();
    return 0;
}
```

## Аргументы по умолчанию


```{.cpp filename="default-argument.cpp"}
{{< include ../examples/06-references-initialization-functions-namespaces/default-argument.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-06-default-argument]{aria-label="Open in Compiler Explorer"}

## Инициализация


- Default initialization
- Value initialization
- Direct initialization
- Copy initialization
- List initialization
- Aggregate initialization
- <https://en.cppreference.com/w/cpp/language/initialization>
- <https://youtu.be/2jJumNzcp6Y>

## Инициализация


```cpp
int main() {
    int k = 2;                       // copy initialization
    int j(2);                        // direct initialization
    int l{};                         // value initialization
    std::string str{'a', 'b', 'c'};  // list initialization
    SCircle circle{{1, 2}, 3};       // aggregate initialization
}
```

Запись `int i();` объявляет функцию, а не переменную.

## namespace


- Предотвращают конфликты имён
- Могут состоять из нескольких блоков
- Помогают организовать код
- Unnamed namespace
- Namespace alias

## namespace


```cpp
namespace Foo {
void f() {
    std::cout << "Foo" << std::endl;
}
}  // namespace Foo

namespace Boo {
void f() {
    std::cout << "Boo" << std::endl;
}
}  // namespace Boo
```

## namespace


```cpp
int main() {
    Foo::f();
    Boo::f();

    return 0;
}
```

## namespace


```cpp
using namespace Foo;
int main() {
    f();
    Boo::f();

    return 0;
}
```

## namespace


Пример намеренно не компилируется: обе директивы `using namespace` делают вызов `f()` неоднозначным.

```cpp
using namespace Foo;
using namespace Boo;

int main() {
    f();  // call to 'f' is ambiguous
    return 0;
}
```

## namespace


Пример намеренно не компилируется: обе директивы `using namespace` делают вызов `f()` неоднозначным.

```cpp
using namespace Foo;
using namespace Boo;

int main() {
    f();  // call to 'f' is ambiguous
    return 0;
}
```

## namespace


```cpp
int main() {
    using namespace Foo;

    f();
    return 0;
}
```

## namespace


```cpp
namespace Foo {
namespace SomeLogNamespaceName {
void f() {
    std::cout << "Foo" << std::endl;
}
}  // namespace SomeLogNamespaceName
}  // namespace Foo

int main() {
    Foo::SomeLogNamespaceName::f();

    return 0;
}
```

## namespace alias


```cpp
namespace Foo {
namespace SomeLogNamespaceName {
void f() {
    std::cout << "Foo" << std::endl;
}
}  // namespace SomeLogNamespaceName
}  // namespace Foo

int main() {
    namespace SN = Foo::SomeLogNamespaceName;

    SN::f();
    return 0;
}
```

## namespace


```{.cpp filename="unnamed-namespace.cpp"}
{{< include ../examples/06-references-initialization-functions-namespaces/unnamed-namespace.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-06-unnamed-namespace]{aria-label="Open in Compiler Explorer"}

## namespace


```cpp
namespace {
int counter;
}

void increment() {
    counter++;
}

namespace A {
namespace {
int counter;
}
void increment() {
    counter++;
}
}  // namespace A
```

## namespace


```cpp
int main() {
    counter++;
    increment();
    A::increment();

    std::cout << counter << std::endl;
    std::cout << A::counter << std::endl;
}
```

[godbolt-06-swap-references]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'void+swap_values(int%26+left,+int%26+right)+%7B%0A++++int+temporary+%3D+left%3B%0A++++left+%3D+right%3B%0A++++right+%3D+temporary%3B%0A%7D%0A%0Aint+main()+%7B%0A++++int+first+%3D+10%3B%0A++++int+second+%3D+20%3B%0A++++swap_values(first,+second)%3B%0A%0A++++return+first+%3D%3D+20+%26%26+second+%3D%3D+10+%3F+0+:+1%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/06-references-initialization-functions-namespaces/swap-references.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-06-function-overload]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'int+test(int+value)+%7B%0A++++return+value%3B%0A%7D%0A%0Afloat+test(float+value)+%7B%0A++++return+value%3B%0A%7D%0A%0Aint+main()+%7B%0A++++return+test(10.2F)+%3D%3D+10.2F+%3F+0+:+1%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/06-references-initialization-functions-namespaces/function-overload.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-06-default-argument]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%23include+%3Cvector%3E%0A%0Avoid+print_vector(const+std::vector%3Cint%3E%26+data,+char+delimiter+%3D+!',!')+%7B%0A++++for+(int+value+:+data)+%7B%0A++++++++std::cout+%3C%3C+value+%3C%3C+delimiter%3B%0A++++%7D%0A++++std::cout+%3C%3C+!'%5Cn!'%3B%0A%7D%0A%0Aint+main()+%7B%0A++++std::vector%3Cint%3E+values%7B1,+2,+3,+4,+5%7D%3B%0A++++print_vector(values)%3B%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/06-references-initialization-functions-namespaces/default-argument.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-06-unnamed-namespace]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%0Anamespace+%7B%0Avoid+print_message()+%7B%0A++++std::cout+%3C%3C+%22Unnamed+namespace+function%5Cn%22%3B%0A%7D%0A%7D++//+namespace%0A%0Aint+main()+%7B%0A++++print_message()%3B%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/06-references-initialization-functions-namespaces/unnamed-namespace.cpp" compiler="clang2310" options="-std=c++20 -O0" -->
