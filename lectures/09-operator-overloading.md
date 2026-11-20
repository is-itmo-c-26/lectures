---
title: "Лекция 9. Перегрузка операторов"
---

::: {.content-visible unless-format="revealjs"}

[Открыть слайды](../slides/lectures/09-operator-overloading.html){.btn .btn-outline-primary target="_blank"}

:::

## План лекции

- Операторы как члены класса и свободные функции
- Сложение, присваивание, ввод, вывод и сравнение дробей
- Префиксный и постфиксный инкремент, преобразование типа
- `friend`, индексирование и функциональные объекты
- RAII и операторы `*` и `->`

## Операторы

- Арифметические:
  - унарные: `+ - ++ --` (префиксные), `++ --` (постфиксные)
  - бинарные: `+ - * / % += -= *= /= %=`
- Битовые: `~ & | ^ << >> &= |= ^= <<= >>=`
- Логические: `! && ||`
- Сравнения: `== != < > <= >= <=>`

## Операторы

- Присваивание: `=`
- Специальные: `* & -> ->* .* , . ::`
- Скобки: `[] ()`
- Приведение типа: `(type)`
- Тернарный оператор: `x ? y : z`
- Работа с памятью: `new new[] delete delete[]`

## Перегрузка операторов

**Не должна противоречить здравой логике.**

- Член класса или свободная функция.
- `[]`, `()`, `->`, `=` — только члены класса (C++20).
- Потоковые `<<` и `>>` для нашего типа — свободные функции.
- `::`, `.*`, `.`, `?:` перегружать нельзя.
- Новые операторы создавать нельзя.
- Приоритет, ассоциативность и число операндов не меняются.

## Вызов перегруженного оператора

| Выражение | Член класса | Свободная функция |
|---|---|---|
| `-a` | `a.operator-()` | `operator-(a)` |
| `a + b` | `a.operator+(b)` | `operator+(a, b)` |
| `a = b` | `a.operator=(b)` | — |
| `a(b)` | `a.operator()(b)` | — |
| `a[b]` | `a.operator[](b)` | — |
| `a++` | `a.operator++(0)` | `operator++(a, 0)` |

У метода левый операнд — `*this`. У свободной функции операнды — параметры.

## Rational

```{.cpp filename="rational.hpp"}
{{< include ../examples/09-operator-overloading/rational.hpp >}}
```

Инвариант: дробь сокращена, знаменатель положителен, ноль — `0/1`.

## Сложение: += и +

:::: {.columns}
::: {.column width="52%"}

```{.cpp filename="rational-add-assign.cpp"}
{{< include ../examples/09-operator-overloading/rational-add-assign.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-09-add-assign]{aria-label="Open in Compiler Explorer"}

`+=` изменяет левый операнд — удобно сделать его методом.

:::
::: {.column width="48%"}

```{.cpp filename="rational-add.cpp"}
{{< include ../examples/09-operator-overloading/rational-add.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-09-add]{aria-label="Open in Compiler Explorer"}

`+` симметричен — выбираем свободную функцию. `lhs` — копия.

:::
::::

Это выбор интерфейса, не требование языка. `add_rationals` складывает и сокращает дроби, проверяя переполнение.

## Сложение дробей

```{.cpp filename="rational-addition-use.cpp"}
{{< include ../examples/09-operator-overloading/rational-addition-use.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-09-addition]{aria-label="Open in Compiler Explorer"}

## Оператор присваивания

```{.cpp filename="rational-assignment.cpp" code-line-numbers="3-6"}
{{< include ../examples/09-operator-overloading/rational-assignment.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-09-assignment-impl]{aria-label="Open in Compiler Explorer"}

Для этого класса достаточно `Rational& operator=(const Rational&) = default;`.

## Оператор вывода

```{.cpp filename="rational-output.cpp"}
{{< include ../examples/09-operator-overloading/rational-output.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-09-output-impl]{aria-label="Open in Compiler Explorer"}

- В `stream << value` левый операнд — `std::ostream`, поэтому это не метод `Rational`.
- Добавить метод в библиотечный класс потока нельзя — определяем свободную функцию.

## Цепочки присваивания и вывода

```{.cpp filename="rational-assignment-use.cpp"}
{{< include ../examples/09-operator-overloading/rational-assignment-use.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-09-assignment]{aria-label="Open in Compiler Explorer"}

## Оператор ввода

```{.cpp filename="rational-input.cpp" code-line-numbers="5-9|10-13|14-18"}
{{< include ../examples/09-operator-overloading/rational-input.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-09-input-impl]{aria-label="Open in Compiler Explorer"}

При ошибке — `failbit`; значение дроби не меняется.

## Операторы равенства

```{.cpp filename="rational-equality.cpp"}
{{< include ../examples/09-operator-overloading/rational-equality.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-09-equality-impl]{aria-label="Open in Compiler Explorer"}

Сокращённые дроби равны, если совпадают числители и знаменатели.

## Оператор меньше

```{.cpp filename="rational-less.cpp"}
{{< include ../examples/09-operator-overloading/rational-less.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-09-less-impl]{aria-label="Open in Compiler Explorer"}

$a/b < c/d \iff ad < cb$ при положительных знаменателях.

Приведение к `long long` — до умножения.

## Остальные сравнения

```{.cpp filename="rational-order.cpp"}
{{< include ../examples/09-operator-overloading/rational-order.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-09-order-impl]{aria-label="Open in Compiler Explorer"}

## Сравнение дробей

```{.cpp filename="rational-comparison-use.cpp"}
{{< include ../examples/09-operator-overloading/rational-comparison-use.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-09-comparison]{aria-label="Open in Compiler Explorer"}

## Сравнения в C++20

- Для `a != b` достаточно подходящего `operator==` с результатом `bool`.
- `operator<=>` задаёт трёхстороннее сравнение; через него доступны `<`, `>`, `<=`, `>=`.
- Если тело `operator<=>` написано вручную, `operator==` нужно определить отдельно.

`operator<=> = default` сравнивает поля по порядку и, если `operator==` не объявлен, добавляет его автоматически.

## Почему не всегда = default

```{.cpp filename="default-order.cpp"}
{{< include ../examples/09-operator-overloading/default-order.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-09-default-order]{aria-label="Open in Compiler Explorer"}

Код компилируется, но считает $1/2 < 1/3$: сравнение полей не задаёт правильный порядок дробей.

## Перегрузка оператора <=>

:::: {.columns}
::: {.column width="54%"}

```{.cpp filename="rational-three-way.cpp"}
{{< include ../examples/09-operator-overloading/rational-three-way.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-09-three-way-impl]{aria-label="Open in Compiler Explorer"}

:::
::: {.column width="46%"}

```{.cpp filename="rational-three-way-use.cpp"}
{{< include ../examples/09-operator-overloading/rational-three-way-use.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-09-three-way]{aria-label="Open in Compiler Explorer"}

:::
::::

`std::strong_ordering`: `less`, `equal` или `greater`. Результат сравнивают с `0`.

`<`, `>`, `<=`, `>=` используют `<=>`; отдельные перегрузки здесь не нужны.

## Инкремент

**Общепринятая договорённость:** обе формы увеличивают значение на единицу. Язык не требует от перегрузки такого поведения или определённого возвращаемого типа.

:::: {.columns}
::: {.column width="52%"}

```{.cpp filename="rational-prefix.cpp"}
{{< include ../examples/09-operator-overloading/rational-prefix.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-09-prefix-impl]{aria-label="Open in Compiler Explorer"}

`++value` возвращает ссылку на изменённый объект.

:::
::: {.column width="48%"}

```{.cpp filename="rational-postfix.cpp"}
{{< include ../examples/09-operator-overloading/rational-postfix.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-09-postfix-impl]{aria-label="Open in Compiler Explorer"}

`value++` возвращает прежнее значение по значению. Параметр `int` отличает постфиксную форму.

:::
::::

## Префиксная и постфиксная формы

```{.cpp filename="rational-increment-use.cpp"}
{{< include ../examples/09-operator-overloading/rational-increment-use.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-09-increment]{aria-label="Open in Compiler Explorer"}

## Оператор преобразования типа

:::: {.columns}
::: {.column width="60%"}

```{.cpp filename="rational.hpp" code-line-numbers="15-17"}
{{< include ../examples/09-operator-overloading/rational.hpp >}}
```

:::
::: {.column width="40%"}

```{.cpp filename="rational-conversion-use.cpp"}
{{< include ../examples/09-operator-overloading/rational-conversion-use.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-09-conversion]{aria-label="Open in Compiler Explorer"}

```{.cpp filename="implicit-float-error.cpp" code-line-numbers="6"}
{{< include ../examples/09-operator-overloading/implicit-float-error.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-09-explicit-error]{aria-label="Open in Compiler Explorer"}

**Не компилируется:** `explicit` запрещает такое неявное преобразование.

:::
::::

## friend

Через публичные методы вывод уже работает. Но свободной функции `operator<<` недоступны закрытые поля напрямую.

::::: {.fragment}

`friend` даёт функции доступ к закрытым членам. Функция остаётся свободной.

:::: {.columns}
::: {.column width="52%"}

```{.cpp filename="friend-rational.hpp" code-line-numbers="11-12"}
{{< include ../examples/09-operator-overloading/friend-rational.hpp >}}
```

:::
::: {.column width="48%"}

```{.cpp filename="friend-output.cpp"}
{{< include ../examples/09-operator-overloading/friend-output.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-09-friend-impl]{aria-label="Open in Compiler Explorer"}

```{.cpp filename="friend-use.cpp"}
{{< include ../examples/09-operator-overloading/friend-use.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-09-friend]{aria-label="Open in Compiler Explorer"}

:::
::::
:::::

## Оператор индексирования

```{.cpp filename="int-array.hpp" code-line-numbers="9-12|13-16"}
{{< include ../examples/09-operator-overloading/int-array.hpp >}}
```

`int&` — чтение и запись; `const int&` — только чтение. Индекс должен быть меньше размера.

## Чтение и изменение элемента

```{.cpp filename="array-use.cpp"}
{{< include ../examples/09-operator-overloading/array-use.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-09-array]{aria-label="Open in Compiler Explorer"}

## Функциональный объект/Функтор

:::: {.columns}
::: {.column width="46%"}

```{.cpp filename="multiplier.hpp"}
{{< include ../examples/09-operator-overloading/multiplier.hpp >}}
```

:::
::: {.column width="54%"}

```{.cpp filename="functor-use.cpp"}
{{< include ../examples/09-operator-overloading/functor-use.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-09-functor]{aria-label="Open in Compiler Explorer"}

:::
::::

Функтор — объект с `operator()`. Произведение в примере должно помещаться в `int`.

## RAII

**Resource Acquisition Is Initialization**

- Конструктор получает ресурс.
- Деструктор освобождает его, в том числе при раскрутке стека.
- Копирование владельца требует отдельного решения.

Память, файлы, блокировки.

## RAII для динамического объекта

:::: {.columns}
::: {.column width="48%"}

```{.cpp filename="foo.hpp"}
{{< include ../examples/09-operator-overloading/foo.hpp >}}
```

:::
::: {.column width="52%"}

```{.cpp filename="foo-ptr.hpp"}
{{< include ../examples/09-operator-overloading/foo-ptr.hpp >}}
```

:::
::::

`FooPtr` единолично владеет объектом, созданным одиночным `new`.

## operator* и operator->

```{.cpp filename="foo-ptr-access.cpp"}
{{< include ../examples/09-operator-overloading/foo-ptr-access.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-09-pointer-impl]{aria-label="Open in Compiler Explorer"}

`const FooPtr` похож на `Foo* const`: сам указатель постоянен, объект `Foo` может изменяться.

`*` возвращает ссылку, `->` — указатель. Обёртка должна быть непустой.

## FooPtr. Использование

```{.cpp filename="foo-ptr-use.cpp"}
{{< include ../examples/09-operator-overloading/foo-ptr-use.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-09-pointer]{aria-label="Open in Compiler Explorer"}

[godbolt-09-assignment]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Climits%3E%0A%23include+%3Cnumeric%3E%0A%23include+%3Cstdexcept%3E%0Astatic_assert(std::numeric_limits%3Cint%3E::digits+%3C+std::numeric_limits%3Clong+long%3E::digits)%3B%0A%0Ainline+void+normalize_rational(int%26+numerator,+int%26+denominator)+%7B%0A++++if+(denominator+%3D%3D+0)+%7B%0A++++++++throw+std::invalid_argument(%22denominator+must+be+nonzero%22)%3B%0A++++%7D%0A++++long+long+n+%3D+numerator,+d+%3D+denominator%3B%0A++++const+auto+divisor+%3D+std::gcd(n,+d)%3B%0A++++n+/%3D+divisor%3B%0A++++d+/%3D+divisor%3B%0A++++if+(d+%3C+0)+%7B%0A++++++++n+%3D+-n%3B%0A++++++++d+%3D+-d%3B%0A++++%7D%0A++++if+(n+%3C+std::numeric_limits%3Cint%3E::min()+%7C%7C+n+%3E+std::numeric_limits%3Cint%3E::max()%0A++++++++%7C%7C+d+%3E+std::numeric_limits%3Cint%3E::max())+%7B%0A++++++++throw+std::overflow_error(%22normalized+rational+does+not+fit+in+int%22)%3B%0A++++%7D%0A++++numerator+%3D+static_cast%3Cint%3E(n)%3B%0A++++denominator+%3D+static_cast%3Cint%3E(d)%3B%0A%7D%0A%0Aclass+Rational+%7B%0Apublic:%0A++++explicit+Rational(int+numerator+%3D+0,+int+denominator+%3D+1)%0A++++++++:+numerator_(numerator),+denominator_(denominator)+%7B%0A++++++++normalize_rational(numerator_,+denominator_)%3B%0A++++%7D%0A++++Rational(const+Rational%26)+%3D+default%3B%0A++++Rational%26+operator%3D(const+Rational%26+other)%3B%0A++++Rational%26+operator%2B%3D(const+Rational%26+rhs)%3B%0A++++Rational%26+operator%2B%2B()%3B%0A++++Rational+operator%2B%2B(int)%3B%0A++++explicit+operator+float()+const+%7B%0A++++++++return+static_cast%3Cfloat%3E(numerator_)+/+denominator_%3B%0A++++%7D%0A%0A++++int+numerator()+const+%7B+return+numerator_%3B+%7D%0A++++int+denominator()+const+%7B+return+denominator_%3B+%7D%0A%0Aprivate:%0A++++int+numerator_%3B%0A++++int+denominator_%3B%0A%7D%3B%0A%23include+%3Ciosfwd%3E%0A%0Astd::ostream%26+operator%3C%3C(std::ostream%26+stream,+const+Rational%26+value)%3B%0Astd::istream%26+operator%3E%3E(std::istream%26+stream,+Rational%26+value)%3B%0A%23include+%3Ciostream%3E%0A%0Aint+main()+%7B%0A++++Rational+first%7B1,+2%7D,+second%7B3,+4%7D,+third%3B%0A++++third+%3D+second+%3D+first%3B%0A++++std::cout+%3C%3C+first+%3C%3C+!'+!'+%3C%3C+second+%3C%3C+!'+!'+%3C%3C+third+%3C%3C+!'%5Cn!'%3B%0A%7D%0A%0A%0A%0ARational%26+Rational::operator%3D(const+Rational%26+other)+%7B%0A++++numerator_+%3D+other.numerator_%3B%0A++++denominator_+%3D+other.denominator_%3B%0A++++return+*this%3B%0A%7D%0A%0A%0A%23include+%3Costream%3E%0A%0Astd::ostream%26+operator%3C%3C(std::ostream%26+stream,+const+Rational%26+value)+%7B%0A++++stream+%3C%3C+value.numerator()+%3C%3C+!'/!'+%3C%3C+value.denominator()%3B%0A++++return+stream%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0+-Wall+-Wextra+-pedantic',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/09-operator-overloading/rational-assignment-use.cpp" compiler="clang2310" options="-std=c++20 -O0 -Wall -Wextra -pedantic" extra-sources="../examples/09-operator-overloading/rational-assignment.cpp ../examples/09-operator-overloading/rational-output.cpp" -->

[godbolt-09-comparison]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Climits%3E%0A%23include+%3Cnumeric%3E%0A%23include+%3Cstdexcept%3E%0Astatic_assert(std::numeric_limits%3Cint%3E::digits+%3C+std::numeric_limits%3Clong+long%3E::digits)%3B%0A%0Ainline+void+normalize_rational(int%26+numerator,+int%26+denominator)+%7B%0A++++if+(denominator+%3D%3D+0)+%7B%0A++++++++throw+std::invalid_argument(%22denominator+must+be+nonzero%22)%3B%0A++++%7D%0A++++long+long+n+%3D+numerator,+d+%3D+denominator%3B%0A++++const+auto+divisor+%3D+std::gcd(n,+d)%3B%0A++++n+/%3D+divisor%3B%0A++++d+/%3D+divisor%3B%0A++++if+(d+%3C+0)+%7B%0A++++++++n+%3D+-n%3B%0A++++++++d+%3D+-d%3B%0A++++%7D%0A++++if+(n+%3C+std::numeric_limits%3Cint%3E::min()+%7C%7C+n+%3E+std::numeric_limits%3Cint%3E::max()%0A++++++++%7C%7C+d+%3E+std::numeric_limits%3Cint%3E::max())+%7B%0A++++++++throw+std::overflow_error(%22normalized+rational+does+not+fit+in+int%22)%3B%0A++++%7D%0A++++numerator+%3D+static_cast%3Cint%3E(n)%3B%0A++++denominator+%3D+static_cast%3Cint%3E(d)%3B%0A%7D%0A%0Aclass+Rational+%7B%0Apublic:%0A++++explicit+Rational(int+numerator+%3D+0,+int+denominator+%3D+1)%0A++++++++:+numerator_(numerator),+denominator_(denominator)+%7B%0A++++++++normalize_rational(numerator_,+denominator_)%3B%0A++++%7D%0A++++Rational(const+Rational%26)+%3D+default%3B%0A++++Rational%26+operator%3D(const+Rational%26+other)%3B%0A++++Rational%26+operator%2B%3D(const+Rational%26+rhs)%3B%0A++++Rational%26+operator%2B%2B()%3B%0A++++Rational+operator%2B%2B(int)%3B%0A++++explicit+operator+float()+const+%7B%0A++++++++return+static_cast%3Cfloat%3E(numerator_)+/+denominator_%3B%0A++++%7D%0A%0A++++int+numerator()+const+%7B+return+numerator_%3B+%7D%0A++++int+denominator()+const+%7B+return+denominator_%3B+%7D%0A%0Aprivate:%0A++++int+numerator_%3B%0A++++int+denominator_%3B%0A%7D%3B%0A%0Abool+operator%3D%3D(const+Rational%26+lhs,+const+Rational%26+rhs)%3B%0Abool+operator!!%3D(const+Rational%26+lhs,+const+Rational%26+rhs)%3B%0Abool+operator%3C(const+Rational%26+lhs,+const+Rational%26+rhs)%3B%0Abool+operator%3E(const+Rational%26+lhs,+const+Rational%26+rhs)%3B%0Abool+operator%3C%3D(const+Rational%26+lhs,+const+Rational%26+rhs)%3B%0Abool+operator%3E%3D(const+Rational%26+lhs,+const+Rational%26+rhs)%3B%0A%23include+%3Ciostream%3E%0A%0Aint+main()+%7B%0A++++Rational+half%7B1,+2%7D,+same%7B2,+4%7D,+negative%7B-1,+3%7D%3B%0A++++std::cout+%3C%3C+std::boolalpha%3B%0A++++std::cout+%3C%3C+(half+%3D%3D+same)+%3C%3C+!'+!'+%3C%3C+(half+!!%3D+same)+%3C%3C+!'%5Cn!'%3B%0A++++std::cout+%3C%3C+(negative+%3C+half)+%3C%3C+!'+!'+%3C%3C+(half+%3E+negative)+%3C%3C+!'%5Cn!'%3B%0A++++std::cout+%3C%3C+(half+%3C%3D+same)+%3C%3C+!'+!'+%3C%3C+(half+%3E%3D+same)+%3C%3C+!'%5Cn!'%3B%0A%7D%0A%0A%0A%0Abool+operator%3D%3D(const+Rational%26+lhs,+const+Rational%26+rhs)+%7B%0A++++return+lhs.numerator()+%3D%3D+rhs.numerator()%0A++++++++%26%26+lhs.denominator()+%3D%3D+rhs.denominator()%3B%0A%7D%0A%0Abool+operator!!%3D(const+Rational%26+lhs,+const+Rational%26+rhs)+%7B%0A++++return+!!(lhs+%3D%3D+rhs)%3B%0A%7D%0A%0A%0A%23include+%3Climits%3E%0A%0Astatic_assert(std::numeric_limits%3Clong+long%3E::digits%0A++++++++++++++%3E%3D+2+*+std::numeric_limits%3Cint%3E::digits)%3B%0A%0Abool+operator%3C(const+Rational%26+lhs,+const+Rational%26+rhs)+%7B%0A++++return+static_cast%3Clong+long%3E(lhs.numerator())+*+rhs.denominator()%0A+++++++++%3C+static_cast%3Clong+long%3E(rhs.numerator())+*+lhs.denominator()%3B%0A%7D%0A%0A%0A%0Abool+operator%3E(const+Rational%26+lhs,+const+Rational%26+rhs)+%7B%0A++++return+rhs+%3C+lhs%3B%0A%7D%0A%0Abool+operator%3C%3D(const+Rational%26+lhs,+const+Rational%26+rhs)+%7B%0A++++return+!!(rhs+%3C+lhs)%3B%0A%7D%0A%0Abool+operator%3E%3D(const+Rational%26+lhs,+const+Rational%26+rhs)+%7B%0A++++return+!!(lhs+%3C+rhs)%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0+-Wall+-Wextra+-pedantic',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/09-operator-overloading/rational-comparison-use.cpp" compiler="clang2310" options="-std=c++20 -O0 -Wall -Wextra -pedantic" extra-sources="../examples/09-operator-overloading/rational-equality.cpp ../examples/09-operator-overloading/rational-less.cpp ../examples/09-operator-overloading/rational-order.cpp" -->

[godbolt-09-increment]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Climits%3E%0A%23include+%3Cnumeric%3E%0A%23include+%3Cstdexcept%3E%0Astatic_assert(std::numeric_limits%3Cint%3E::digits+%3C+std::numeric_limits%3Clong+long%3E::digits)%3B%0A%0Ainline+void+normalize_rational(int%26+numerator,+int%26+denominator)+%7B%0A++++if+(denominator+%3D%3D+0)+%7B%0A++++++++throw+std::invalid_argument(%22denominator+must+be+nonzero%22)%3B%0A++++%7D%0A++++long+long+n+%3D+numerator,+d+%3D+denominator%3B%0A++++const+auto+divisor+%3D+std::gcd(n,+d)%3B%0A++++n+/%3D+divisor%3B%0A++++d+/%3D+divisor%3B%0A++++if+(d+%3C+0)+%7B%0A++++++++n+%3D+-n%3B%0A++++++++d+%3D+-d%3B%0A++++%7D%0A++++if+(n+%3C+std::numeric_limits%3Cint%3E::min()+%7C%7C+n+%3E+std::numeric_limits%3Cint%3E::max()%0A++++++++%7C%7C+d+%3E+std::numeric_limits%3Cint%3E::max())+%7B%0A++++++++throw+std::overflow_error(%22normalized+rational+does+not+fit+in+int%22)%3B%0A++++%7D%0A++++numerator+%3D+static_cast%3Cint%3E(n)%3B%0A++++denominator+%3D+static_cast%3Cint%3E(d)%3B%0A%7D%0A%0Aclass+Rational+%7B%0Apublic:%0A++++explicit+Rational(int+numerator+%3D+0,+int+denominator+%3D+1)%0A++++++++:+numerator_(numerator),+denominator_(denominator)+%7B%0A++++++++normalize_rational(numerator_,+denominator_)%3B%0A++++%7D%0A++++Rational(const+Rational%26)+%3D+default%3B%0A++++Rational%26+operator%3D(const+Rational%26+other)%3B%0A++++Rational%26+operator%2B%3D(const+Rational%26+rhs)%3B%0A++++Rational%26+operator%2B%2B()%3B%0A++++Rational+operator%2B%2B(int)%3B%0A++++explicit+operator+float()+const+%7B%0A++++++++return+static_cast%3Cfloat%3E(numerator_)+/+denominator_%3B%0A++++%7D%0A%0A++++int+numerator()+const+%7B+return+numerator_%3B+%7D%0A++++int+denominator()+const+%7B+return+denominator_%3B+%7D%0A%0Aprivate:%0A++++int+numerator_%3B%0A++++int+denominator_%3B%0A%7D%3B%0A%23include+%3Ciosfwd%3E%0A%0Astd::ostream%26+operator%3C%3C(std::ostream%26+stream,+const+Rational%26+value)%3B%0Astd::istream%26+operator%3E%3E(std::istream%26+stream,+Rational%26+value)%3B%0A%23include+%3Ciostream%3E%0A%0Aint+main()+%7B%0A++++Rational+value%7B1,+2%7D%3B%0A++++Rational+previous+%3D+value%2B%2B%3B%0A++++std::cout+%3C%3C+previous+%3C%3C+!'+!'+%3C%3C+value+%3C%3C+!'%5Cn!'%3B%0A++++Rational%26+current+%3D+%2B%2Bvalue%3B%0A++++std::cout+%3C%3C+current+%3C%3C+!'+!'+%3C%3C+(%26current+%3D%3D+%26value)+%3C%3C+!'%5Cn!'%3B%0A%7D%0A%0A%0A%23include+%3Climits%3E%0A%23include+%3Cstdexcept%3E%0A%0ARational%26+Rational::operator%2B%2B()+%7B%0A++++if+(numerator_+%3E+std::numeric_limits%3Cint%3E::max()+-+denominator_)+%7B%0A++++++++throw+std::overflow_error(%22increment+does+not+fit+in+int%22)%3B%0A++++%7D%0A++++numerator_+%2B%3D+denominator_%3B%0A++++return+*this%3B%0A%7D%0A%0A%0A%0ARational+Rational::operator%2B%2B(int)+%7B%0A++++Rational+previous%7B*this%7D%3B%0A++++%2B%2B*this%3B%0A++++return+previous%3B%0A%7D%0A%0A%0A%23include+%3Costream%3E%0A%0Astd::ostream%26+operator%3C%3C(std::ostream%26+stream,+const+Rational%26+value)+%7B%0A++++stream+%3C%3C+value.numerator()+%3C%3C+!'/!'+%3C%3C+value.denominator()%3B%0A++++return+stream%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0+-Wall+-Wextra+-pedantic',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/09-operator-overloading/rational-increment-use.cpp" compiler="clang2310" options="-std=c++20 -O0 -Wall -Wextra -pedantic" extra-sources="../examples/09-operator-overloading/rational-prefix.cpp ../examples/09-operator-overloading/rational-postfix.cpp ../examples/09-operator-overloading/rational-output.cpp" -->

[godbolt-09-conversion]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Climits%3E%0A%23include+%3Cnumeric%3E%0A%23include+%3Cstdexcept%3E%0Astatic_assert(std::numeric_limits%3Cint%3E::digits+%3C+std::numeric_limits%3Clong+long%3E::digits)%3B%0A%0Ainline+void+normalize_rational(int%26+numerator,+int%26+denominator)+%7B%0A++++if+(denominator+%3D%3D+0)+%7B%0A++++++++throw+std::invalid_argument(%22denominator+must+be+nonzero%22)%3B%0A++++%7D%0A++++long+long+n+%3D+numerator,+d+%3D+denominator%3B%0A++++const+auto+divisor+%3D+std::gcd(n,+d)%3B%0A++++n+/%3D+divisor%3B%0A++++d+/%3D+divisor%3B%0A++++if+(d+%3C+0)+%7B%0A++++++++n+%3D+-n%3B%0A++++++++d+%3D+-d%3B%0A++++%7D%0A++++if+(n+%3C+std::numeric_limits%3Cint%3E::min()+%7C%7C+n+%3E+std::numeric_limits%3Cint%3E::max()%0A++++++++%7C%7C+d+%3E+std::numeric_limits%3Cint%3E::max())+%7B%0A++++++++throw+std::overflow_error(%22normalized+rational+does+not+fit+in+int%22)%3B%0A++++%7D%0A++++numerator+%3D+static_cast%3Cint%3E(n)%3B%0A++++denominator+%3D+static_cast%3Cint%3E(d)%3B%0A%7D%0A%0Aclass+Rational+%7B%0Apublic:%0A++++explicit+Rational(int+numerator+%3D+0,+int+denominator+%3D+1)%0A++++++++:+numerator_(numerator),+denominator_(denominator)+%7B%0A++++++++normalize_rational(numerator_,+denominator_)%3B%0A++++%7D%0A++++Rational(const+Rational%26)+%3D+default%3B%0A++++Rational%26+operator%3D(const+Rational%26+other)%3B%0A++++Rational%26+operator%2B%3D(const+Rational%26+rhs)%3B%0A++++Rational%26+operator%2B%2B()%3B%0A++++Rational+operator%2B%2B(int)%3B%0A++++explicit+operator+float()+const+%7B%0A++++++++return+static_cast%3Cfloat%3E(numerator_)+/+denominator_%3B%0A++++%7D%0A%0A++++int+numerator()+const+%7B+return+numerator_%3B+%7D%0A++++int+denominator()+const+%7B+return+denominator_%3B+%7D%0A%0Aprivate:%0A++++int+numerator_%3B%0A++++int+denominator_%3B%0A%7D%3B%0A%23include+%3Ciostream%3E%0A%0Aint+main()+%7B%0A++++Rational+half%7B1,+2%7D%3B%0A++++float+value+%3D+static_cast%3Cfloat%3E(half)%3B%0A++++std::cout+%3C%3C+value+%3C%3C+!'%5Cn!'%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0+-Wall+-Wextra+-pedantic',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/09-operator-overloading/rational-conversion-use.cpp" compiler="clang2310" options="-std=c++20 -O0 -Wall -Wextra -pedantic" -->

[godbolt-09-friend]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Climits%3E%0A%23include+%3Cnumeric%3E%0A%23include+%3Cstdexcept%3E%0Astatic_assert(std::numeric_limits%3Cint%3E::digits+%3C+std::numeric_limits%3Clong+long%3E::digits)%3B%0A%0Ainline+void+normalize_rational(int%26+numerator,+int%26+denominator)+%7B%0A++++if+(denominator+%3D%3D+0)+%7B%0A++++++++throw+std::invalid_argument(%22denominator+must+be+nonzero%22)%3B%0A++++%7D%0A++++long+long+n+%3D+numerator,+d+%3D+denominator%3B%0A++++const+auto+divisor+%3D+std::gcd(n,+d)%3B%0A++++n+/%3D+divisor%3B%0A++++d+/%3D+divisor%3B%0A++++if+(d+%3C+0)+%7B%0A++++++++n+%3D+-n%3B%0A++++++++d+%3D+-d%3B%0A++++%7D%0A++++if+(n+%3C+std::numeric_limits%3Cint%3E::min()+%7C%7C+n+%3E+std::numeric_limits%3Cint%3E::max()%0A++++++++%7C%7C+d+%3E+std::numeric_limits%3Cint%3E::max())+%7B%0A++++++++throw+std::overflow_error(%22normalized+rational+does+not+fit+in+int%22)%3B%0A++++%7D%0A++++numerator+%3D+static_cast%3Cint%3E(n)%3B%0A++++denominator+%3D+static_cast%3Cint%3E(d)%3B%0A%7D%0A%23include+%3Ciosfwd%3E%0A%0Aclass+Rational+%7B%0Apublic:%0A++++explicit+Rational(int+numerator+%3D+0,+int+denominator+%3D+1)%0A++++++++:+numerator_(numerator),+denominator_(denominator)+%7B%0A++++++++normalize_rational(numerator_,+denominator_)%3B%0A++++%7D%0A++++friend+std::ostream%26+operator%3C%3C(std::ostream%26+stream,%0A++++++++++++++++++++++++++++++++++++const+Rational%26+value)%3B%0A%0Aprivate:%0A++++int+numerator_%3B%0A++++int+denominator_%3B%0A%7D%3B%0A%23include+%3Ciostream%3E%0A%0Aint+main()+%7B%0A++++std::cout+%3C%3C+Rational%7B2,+4%7D+%3C%3C+!'%5Cn!'%3B%0A%7D%0A%0A%0A%23include+%3Costream%3E%0A%0Astd::ostream%26+operator%3C%3C(std::ostream%26+stream,%0A+++++++++++++++++++++++++const+Rational%26+value)+%7B%0A++++stream+%3C%3C+value.numerator_+%3C%3C+!'/!'+%3C%3C+value.denominator_%3B%0A++++return+stream%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0+-Wall+-Wextra+-pedantic',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/09-operator-overloading/friend-use.cpp" compiler="clang2310" options="-std=c++20 -O0 -Wall -Wextra -pedantic" extra-sources="../examples/09-operator-overloading/friend-output.cpp" -->

[godbolt-09-array]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ccassert%3E%0A%23include+%3Ccstddef%3E%0A%23include+%3Cvector%3E%0A%0Aclass+IntArray+%7B%0Apublic:%0A++++explicit+IntArray(std::size_t+size)+:+data_(size)+%7B%7D%0A++++int%26+operator%5B%5D(std::size_t+index)+%7B%0A++++++++assert(index+%3C+data_.size())%3B%0A++++++++return+data_%5Bindex%5D%3B%0A++++%7D%0A++++const+int%26+operator%5B%5D(std::size_t+index)+const+%7B%0A++++++++assert(index+%3C+data_.size())%3B%0A++++++++return+data_%5Bindex%5D%3B%0A++++%7D%0A%0Aprivate:%0A++++std::vector%3Cint%3E+data_%3B%0A%7D%3B%0A%23include+%3Ciostream%3E%0A%0Aint+main()+%7B%0A++++IntArray+values%7B3%7D%3B%0A++++values%5B1%5D+%3D+42%3B%0A++++const+IntArray%26+view+%3D+values%3B%0A++++std::cout+%3C%3C+view%5B1%5D+%3C%3C+!'%5Cn!'%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0+-Wall+-Wextra+-pedantic',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/09-operator-overloading/array-use.cpp" compiler="clang2310" options="-std=c++20 -O0 -Wall -Wextra -pedantic" -->

[godbolt-09-functor]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%0Aclass+Multiplier+%7B%0Apublic:%0A++++explicit+Multiplier(int+factor)+:+factor_(factor)+%7B%7D%0A%0A++++int+operator()(int+value)+const+%7B%0A++++++++return+factor_+*+value%3B%0A++++%7D%0A%0Aprivate:%0A++++int+factor_%3B%0A%7D%3B%0A%23include+%3Calgorithm%3E%0A%23include+%3Ciostream%3E%0A%23include+%3Cvector%3E%0A%0Aint+main()+%7B%0A++++const+Multiplier+twice%7B2%7D%3B%0A++++std::cout+%3C%3C+twice(3)+%3C%3C+!'%5Cn!'%3B%0A%0A++++std::vector%3Cint%3E+data%7B1,+2,+3,+4,+5%7D%3B%0A++++std::transform(data.begin(),+data.end(),+data.begin(),+Multiplier%7B5%7D)%3B%0A++++for+(int+value+:+data)+%7B%0A++++++++std::cout+%3C%3C+value+%3C%3C+!'+!'%3B%0A++++%7D%0A++++std::cout+%3C%3C+!'%5Cn!'%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0+-Wall+-Wextra+-pedantic',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/09-operator-overloading/functor-use.cpp" compiler="clang2310" options="-std=c++20 -O0 -Wall -Wextra -pedantic" -->

[godbolt-09-pointer]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%0Aclass+Foo+%7B%0Apublic:%0A++++int+foo()+const+%7B+return+value_%3B+%7D%0A%0Aprivate:%0A++++int+value_+%3D+2025%3B%0A%7D%3B%0A%0Aclass+FooPtr+%7B%0Apublic:%0A++++explicit+FooPtr(Foo*+ptr+%3D+nullptr)+:+ptr_(ptr)+%7B%7D%0A++++~FooPtr()+%7B+delete+ptr_%3B+%7D%0A++++FooPtr(const+FooPtr%26)+%3D+delete%3B%0A++++FooPtr%26+operator%3D(const+FooPtr%26)+%3D+delete%3B%0A%0A++++Foo%26+operator*()+const%3B%0A++++Foo*+operator-%3E()+const%3B%0A%0Aprivate:%0A++++Foo*+ptr_%3B%0A%7D%3B%0A%23include+%3Ciostream%3E%0A%0Aint+main()+%7B%0A++++FooPtr+pointer%7Bnew+Foo%7D%3B%0A++++std::cout+%3C%3C+pointer-%3Efoo()+%3C%3C+!'%5Cn!'%3B%0A++++std::cout+%3C%3C+(*pointer).foo()+%3C%3C+!'%5Cn!'%3B%0A%7D%0A%0A%0A%23include+%3Ccassert%3E%0A%0AFoo%26+FooPtr::operator*()+const+%7B%0A++++assert(ptr_+!!%3D+nullptr)%3B%0A++++return+*ptr_%3B%0A%7D%0A%0AFoo*+FooPtr::operator-%3E()+const+%7B%0A++++assert(ptr_+!!%3D+nullptr)%3B%0A++++return+ptr_%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0+-Wall+-Wextra+-pedantic',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/09-operator-overloading/foo-ptr-use.cpp" compiler="clang2310" options="-std=c++20 -O0 -Wall -Wextra -pedantic" extra-sources="../examples/09-operator-overloading/foo-ptr-access.cpp" -->

[godbolt-09-assignment-impl]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Climits%3E%0A%23include+%3Cnumeric%3E%0A%23include+%3Cstdexcept%3E%0Astatic_assert(std::numeric_limits%3Cint%3E::digits+%3C+std::numeric_limits%3Clong+long%3E::digits)%3B%0A%0Ainline+void+normalize_rational(int%26+numerator,+int%26+denominator)+%7B%0A++++if+(denominator+%3D%3D+0)+%7B%0A++++++++throw+std::invalid_argument(%22denominator+must+be+nonzero%22)%3B%0A++++%7D%0A++++long+long+n+%3D+numerator,+d+%3D+denominator%3B%0A++++const+auto+divisor+%3D+std::gcd(n,+d)%3B%0A++++n+/%3D+divisor%3B%0A++++d+/%3D+divisor%3B%0A++++if+(d+%3C+0)+%7B%0A++++++++n+%3D+-n%3B%0A++++++++d+%3D+-d%3B%0A++++%7D%0A++++if+(n+%3C+std::numeric_limits%3Cint%3E::min()+%7C%7C+n+%3E+std::numeric_limits%3Cint%3E::max()%0A++++++++%7C%7C+d+%3E+std::numeric_limits%3Cint%3E::max())+%7B%0A++++++++throw+std::overflow_error(%22normalized+rational+does+not+fit+in+int%22)%3B%0A++++%7D%0A++++numerator+%3D+static_cast%3Cint%3E(n)%3B%0A++++denominator+%3D+static_cast%3Cint%3E(d)%3B%0A%7D%0A%0Aclass+Rational+%7B%0Apublic:%0A++++explicit+Rational(int+numerator+%3D+0,+int+denominator+%3D+1)%0A++++++++:+numerator_(numerator),+denominator_(denominator)+%7B%0A++++++++normalize_rational(numerator_,+denominator_)%3B%0A++++%7D%0A++++Rational(const+Rational%26)+%3D+default%3B%0A++++Rational%26+operator%3D(const+Rational%26+other)%3B%0A++++Rational%26+operator%2B%3D(const+Rational%26+rhs)%3B%0A++++Rational%26+operator%2B%2B()%3B%0A++++Rational+operator%2B%2B(int)%3B%0A++++explicit+operator+float()+const+%7B%0A++++++++return+static_cast%3Cfloat%3E(numerator_)+/+denominator_%3B%0A++++%7D%0A%0A++++int+numerator()+const+%7B+return+numerator_%3B+%7D%0A++++int+denominator()+const+%7B+return+denominator_%3B+%7D%0A%0Aprivate:%0A++++int+numerator_%3B%0A++++int+denominator_%3B%0A%7D%3B%0A%0ARational%26+Rational::operator%3D(const+Rational%26+other)+%7B%0A++++numerator_+%3D+other.numerator_%3B%0A++++denominator_+%3D+other.denominator_%3B%0A++++return+*this%3B%0A%7D%0A%0A%0A%23include+%3Ciosfwd%3E%0A%0Astd::ostream%26+operator%3C%3C(std::ostream%26+stream,+const+Rational%26+value)%3B%0Astd::istream%26+operator%3E%3E(std::istream%26+stream,+Rational%26+value)%3B%0A%23include+%3Costream%3E%0A%0Astd::ostream%26+operator%3C%3C(std::ostream%26+stream,+const+Rational%26+value)+%7B%0A++++stream+%3C%3C+value.numerator()+%3C%3C+!'/!'+%3C%3C+value.denominator()%3B%0A++++return+stream%3B%0A%7D%0A%0A%0A%23include+%3Ciostream%3E%0A%0Aint+main()+%7B%0A++++Rational+first%7B1,+2%7D,+second%7B3,+4%7D,+third%3B%0A++++third+%3D+second+%3D+first%3B%0A++++std::cout+%3C%3C+first+%3C%3C+!'+!'+%3C%3C+second+%3C%3C+!'+!'+%3C%3C+third+%3C%3C+!'%5Cn!'%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0+-Wall+-Wextra+-pedantic',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/09-operator-overloading/rational-assignment.cpp" compiler="clang2310" options="-std=c++20 -O0 -Wall -Wextra -pedantic" extra-sources="../examples/09-operator-overloading/rational-output.cpp ../examples/09-operator-overloading/rational-assignment-use.cpp" -->

[godbolt-09-output-impl]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Climits%3E%0A%23include+%3Cnumeric%3E%0A%23include+%3Cstdexcept%3E%0Astatic_assert(std::numeric_limits%3Cint%3E::digits+%3C+std::numeric_limits%3Clong+long%3E::digits)%3B%0A%0Ainline+void+normalize_rational(int%26+numerator,+int%26+denominator)+%7B%0A++++if+(denominator+%3D%3D+0)+%7B%0A++++++++throw+std::invalid_argument(%22denominator+must+be+nonzero%22)%3B%0A++++%7D%0A++++long+long+n+%3D+numerator,+d+%3D+denominator%3B%0A++++const+auto+divisor+%3D+std::gcd(n,+d)%3B%0A++++n+/%3D+divisor%3B%0A++++d+/%3D+divisor%3B%0A++++if+(d+%3C+0)+%7B%0A++++++++n+%3D+-n%3B%0A++++++++d+%3D+-d%3B%0A++++%7D%0A++++if+(n+%3C+std::numeric_limits%3Cint%3E::min()+%7C%7C+n+%3E+std::numeric_limits%3Cint%3E::max()%0A++++++++%7C%7C+d+%3E+std::numeric_limits%3Cint%3E::max())+%7B%0A++++++++throw+std::overflow_error(%22normalized+rational+does+not+fit+in+int%22)%3B%0A++++%7D%0A++++numerator+%3D+static_cast%3Cint%3E(n)%3B%0A++++denominator+%3D+static_cast%3Cint%3E(d)%3B%0A%7D%0A%0Aclass+Rational+%7B%0Apublic:%0A++++explicit+Rational(int+numerator+%3D+0,+int+denominator+%3D+1)%0A++++++++:+numerator_(numerator),+denominator_(denominator)+%7B%0A++++++++normalize_rational(numerator_,+denominator_)%3B%0A++++%7D%0A++++Rational(const+Rational%26)+%3D+default%3B%0A++++Rational%26+operator%3D(const+Rational%26+other)%3B%0A++++Rational%26+operator%2B%3D(const+Rational%26+rhs)%3B%0A++++Rational%26+operator%2B%2B()%3B%0A++++Rational+operator%2B%2B(int)%3B%0A++++explicit+operator+float()+const+%7B%0A++++++++return+static_cast%3Cfloat%3E(numerator_)+/+denominator_%3B%0A++++%7D%0A%0A++++int+numerator()+const+%7B+return+numerator_%3B+%7D%0A++++int+denominator()+const+%7B+return+denominator_%3B+%7D%0A%0Aprivate:%0A++++int+numerator_%3B%0A++++int+denominator_%3B%0A%7D%3B%0A%23include+%3Ciosfwd%3E%0A%0Astd::ostream%26+operator%3C%3C(std::ostream%26+stream,+const+Rational%26+value)%3B%0Astd::istream%26+operator%3E%3E(std::istream%26+stream,+Rational%26+value)%3B%0A%23include+%3Costream%3E%0A%0Astd::ostream%26+operator%3C%3C(std::ostream%26+stream,+const+Rational%26+value)+%7B%0A++++stream+%3C%3C+value.numerator()+%3C%3C+!'/!'+%3C%3C+value.denominator()%3B%0A++++return+stream%3B%0A%7D%0A%0A%0A%0ARational%26+Rational::operator%3D(const+Rational%26+other)+%7B%0A++++numerator_+%3D+other.numerator_%3B%0A++++denominator_+%3D+other.denominator_%3B%0A++++return+*this%3B%0A%7D%0A%0A%0A%23include+%3Ciostream%3E%0A%0Aint+main()+%7B%0A++++Rational+first%7B1,+2%7D,+second%7B3,+4%7D,+third%3B%0A++++third+%3D+second+%3D+first%3B%0A++++std::cout+%3C%3C+first+%3C%3C+!'+!'+%3C%3C+second+%3C%3C+!'+!'+%3C%3C+third+%3C%3C+!'%5Cn!'%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0+-Wall+-Wextra+-pedantic',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/09-operator-overloading/rational-output.cpp" compiler="clang2310" options="-std=c++20 -O0 -Wall -Wextra -pedantic" extra-sources="../examples/09-operator-overloading/rational-assignment.cpp ../examples/09-operator-overloading/rational-assignment-use.cpp" -->

[godbolt-09-input-impl]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Climits%3E%0A%23include+%3Cnumeric%3E%0A%23include+%3Cstdexcept%3E%0Astatic_assert(std::numeric_limits%3Cint%3E::digits+%3C+std::numeric_limits%3Clong+long%3E::digits)%3B%0A%0Ainline+void+normalize_rational(int%26+numerator,+int%26+denominator)+%7B%0A++++if+(denominator+%3D%3D+0)+%7B%0A++++++++throw+std::invalid_argument(%22denominator+must+be+nonzero%22)%3B%0A++++%7D%0A++++long+long+n+%3D+numerator,+d+%3D+denominator%3B%0A++++const+auto+divisor+%3D+std::gcd(n,+d)%3B%0A++++n+/%3D+divisor%3B%0A++++d+/%3D+divisor%3B%0A++++if+(d+%3C+0)+%7B%0A++++++++n+%3D+-n%3B%0A++++++++d+%3D+-d%3B%0A++++%7D%0A++++if+(n+%3C+std::numeric_limits%3Cint%3E::min()+%7C%7C+n+%3E+std::numeric_limits%3Cint%3E::max()%0A++++++++%7C%7C+d+%3E+std::numeric_limits%3Cint%3E::max())+%7B%0A++++++++throw+std::overflow_error(%22normalized+rational+does+not+fit+in+int%22)%3B%0A++++%7D%0A++++numerator+%3D+static_cast%3Cint%3E(n)%3B%0A++++denominator+%3D+static_cast%3Cint%3E(d)%3B%0A%7D%0A%0Aclass+Rational+%7B%0Apublic:%0A++++explicit+Rational(int+numerator+%3D+0,+int+denominator+%3D+1)%0A++++++++:+numerator_(numerator),+denominator_(denominator)+%7B%0A++++++++normalize_rational(numerator_,+denominator_)%3B%0A++++%7D%0A++++Rational(const+Rational%26)+%3D+default%3B%0A++++Rational%26+operator%3D(const+Rational%26+other)%3B%0A++++Rational%26+operator%2B%3D(const+Rational%26+rhs)%3B%0A++++Rational%26+operator%2B%2B()%3B%0A++++Rational+operator%2B%2B(int)%3B%0A++++explicit+operator+float()+const+%7B%0A++++++++return+static_cast%3Cfloat%3E(numerator_)+/+denominator_%3B%0A++++%7D%0A%0A++++int+numerator()+const+%7B+return+numerator_%3B+%7D%0A++++int+denominator()+const+%7B+return+denominator_%3B+%7D%0A%0Aprivate:%0A++++int+numerator_%3B%0A++++int+denominator_%3B%0A%7D%3B%0A%23include+%3Ciosfwd%3E%0A%0Astd::ostream%26+operator%3C%3C(std::ostream%26+stream,+const+Rational%26+value)%3B%0Astd::istream%26+operator%3E%3E(std::istream%26+stream,+Rational%26+value)%3B%0A%23include+%3Cistream%3E%0A%0Astd::istream%26+operator%3E%3E(std::istream%26+stream,+Rational%26+value)+%7B%0A++++int+numerator+%3D+0,+denominator+%3D+0%3B%0A++++char+separator+%3D+!'%5C0!'%3B%0A++++if+(!!(stream+%3E%3E+numerator+%3E%3E+separator+%3E%3E+denominator))+%7B%0A++++++++return+stream%3B%0A++++%7D%0A++++if+(separator+!!%3D+!'/!'+%7C%7C+denominator+%3D%3D+0)+%7B%0A++++++++stream.setstate(std::ios::failbit)%3B%0A++++++++return+stream%3B%0A++++%7D%0A++++try+%7B%0A++++++++value+%3D+Rational%7Bnumerator,+denominator%7D%3B%0A++++%7D+catch+(const+std::overflow_error%26)+%7B%0A++++++++stream.setstate(std::ios::failbit)%3B%0A++++%7D%0A++++return+stream%3B%0A%7D%0A%0A%0A%0ARational%26+Rational::operator%3D(const+Rational%26+other)+%7B%0A++++numerator_+%3D+other.numerator_%3B%0A++++denominator_+%3D+other.denominator_%3B%0A++++return+*this%3B%0A%7D%0A%0A%0A%23include+%3Costream%3E%0A%0Astd::ostream%26+operator%3C%3C(std::ostream%26+stream,+const+Rational%26+value)+%7B%0A++++stream+%3C%3C+value.numerator()+%3C%3C+!'/!'+%3C%3C+value.denominator()%3B%0A++++return+stream%3B%0A%7D%0A%0A%0A%23include+%3Ciostream%3E%0A%23include+%3Csstream%3E%0A%0Aint+main()+%7B%0A++++std::istringstream+input%7B%222/4+3/0%22%7D%3B%0A++++Rational+value%7B7,+8%7D%3B%0A++++if+(input+%3E%3E+value)+%7B%0A++++++++std::cout+%3C%3C+value+%3C%3C+!'%5Cn!'%3B%0A++++%7D%0A++++if+(!!(input+%3E%3E+value))+%7B%0A++++++++std::cout+%3C%3C+%22invalid+input%3B+value+%3D+%22+%3C%3C+value+%3C%3C+!'%5Cn!'%3B%0A++++%7D%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0+-Wall+-Wextra+-pedantic',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/09-operator-overloading/rational-input.cpp" compiler="clang2310" options="-std=c++20 -O0 -Wall -Wextra -pedantic" extra-sources="../examples/09-operator-overloading/rational-assignment.cpp ../examples/09-operator-overloading/rational-output.cpp ../examples/09-operator-overloading/rational-input-use.cpp" -->

[godbolt-09-equality-impl]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Climits%3E%0A%23include+%3Cnumeric%3E%0A%23include+%3Cstdexcept%3E%0Astatic_assert(std::numeric_limits%3Cint%3E::digits+%3C+std::numeric_limits%3Clong+long%3E::digits)%3B%0A%0Ainline+void+normalize_rational(int%26+numerator,+int%26+denominator)+%7B%0A++++if+(denominator+%3D%3D+0)+%7B%0A++++++++throw+std::invalid_argument(%22denominator+must+be+nonzero%22)%3B%0A++++%7D%0A++++long+long+n+%3D+numerator,+d+%3D+denominator%3B%0A++++const+auto+divisor+%3D+std::gcd(n,+d)%3B%0A++++n+/%3D+divisor%3B%0A++++d+/%3D+divisor%3B%0A++++if+(d+%3C+0)+%7B%0A++++++++n+%3D+-n%3B%0A++++++++d+%3D+-d%3B%0A++++%7D%0A++++if+(n+%3C+std::numeric_limits%3Cint%3E::min()+%7C%7C+n+%3E+std::numeric_limits%3Cint%3E::max()%0A++++++++%7C%7C+d+%3E+std::numeric_limits%3Cint%3E::max())+%7B%0A++++++++throw+std::overflow_error(%22normalized+rational+does+not+fit+in+int%22)%3B%0A++++%7D%0A++++numerator+%3D+static_cast%3Cint%3E(n)%3B%0A++++denominator+%3D+static_cast%3Cint%3E(d)%3B%0A%7D%0A%0Aclass+Rational+%7B%0Apublic:%0A++++explicit+Rational(int+numerator+%3D+0,+int+denominator+%3D+1)%0A++++++++:+numerator_(numerator),+denominator_(denominator)+%7B%0A++++++++normalize_rational(numerator_,+denominator_)%3B%0A++++%7D%0A++++Rational(const+Rational%26)+%3D+default%3B%0A++++Rational%26+operator%3D(const+Rational%26+other)%3B%0A++++Rational%26+operator%2B%3D(const+Rational%26+rhs)%3B%0A++++Rational%26+operator%2B%2B()%3B%0A++++Rational+operator%2B%2B(int)%3B%0A++++explicit+operator+float()+const+%7B%0A++++++++return+static_cast%3Cfloat%3E(numerator_)+/+denominator_%3B%0A++++%7D%0A%0A++++int+numerator()+const+%7B+return+numerator_%3B+%7D%0A++++int+denominator()+const+%7B+return+denominator_%3B+%7D%0A%0Aprivate:%0A++++int+numerator_%3B%0A++++int+denominator_%3B%0A%7D%3B%0A%0Abool+operator%3D%3D(const+Rational%26+lhs,+const+Rational%26+rhs)%3B%0Abool+operator!!%3D(const+Rational%26+lhs,+const+Rational%26+rhs)%3B%0Abool+operator%3C(const+Rational%26+lhs,+const+Rational%26+rhs)%3B%0Abool+operator%3E(const+Rational%26+lhs,+const+Rational%26+rhs)%3B%0Abool+operator%3C%3D(const+Rational%26+lhs,+const+Rational%26+rhs)%3B%0Abool+operator%3E%3D(const+Rational%26+lhs,+const+Rational%26+rhs)%3B%0A%0Abool+operator%3D%3D(const+Rational%26+lhs,+const+Rational%26+rhs)+%7B%0A++++return+lhs.numerator()+%3D%3D+rhs.numerator()%0A++++++++%26%26+lhs.denominator()+%3D%3D+rhs.denominator()%3B%0A%7D%0A%0Abool+operator!!%3D(const+Rational%26+lhs,+const+Rational%26+rhs)+%7B%0A++++return+!!(lhs+%3D%3D+rhs)%3B%0A%7D%0A%0A%0A%23include+%3Climits%3E%0A%0Astatic_assert(std::numeric_limits%3Clong+long%3E::digits%0A++++++++++++++%3E%3D+2+*+std::numeric_limits%3Cint%3E::digits)%3B%0A%0Abool+operator%3C(const+Rational%26+lhs,+const+Rational%26+rhs)+%7B%0A++++return+static_cast%3Clong+long%3E(lhs.numerator())+*+rhs.denominator()%0A+++++++++%3C+static_cast%3Clong+long%3E(rhs.numerator())+*+lhs.denominator()%3B%0A%7D%0A%0A%0A%0Abool+operator%3E(const+Rational%26+lhs,+const+Rational%26+rhs)+%7B%0A++++return+rhs+%3C+lhs%3B%0A%7D%0A%0Abool+operator%3C%3D(const+Rational%26+lhs,+const+Rational%26+rhs)+%7B%0A++++return+!!(rhs+%3C+lhs)%3B%0A%7D%0A%0Abool+operator%3E%3D(const+Rational%26+lhs,+const+Rational%26+rhs)+%7B%0A++++return+!!(lhs+%3C+rhs)%3B%0A%7D%0A%0A%0A%23include+%3Ciostream%3E%0A%0Aint+main()+%7B%0A++++Rational+half%7B1,+2%7D,+same%7B2,+4%7D,+negative%7B-1,+3%7D%3B%0A++++std::cout+%3C%3C+std::boolalpha%3B%0A++++std::cout+%3C%3C+(half+%3D%3D+same)+%3C%3C+!'+!'+%3C%3C+(half+!!%3D+same)+%3C%3C+!'%5Cn!'%3B%0A++++std::cout+%3C%3C+(negative+%3C+half)+%3C%3C+!'+!'+%3C%3C+(half+%3E+negative)+%3C%3C+!'%5Cn!'%3B%0A++++std::cout+%3C%3C+(half+%3C%3D+same)+%3C%3C+!'+!'+%3C%3C+(half+%3E%3D+same)+%3C%3C+!'%5Cn!'%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0+-Wall+-Wextra+-pedantic',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/09-operator-overloading/rational-equality.cpp" compiler="clang2310" options="-std=c++20 -O0 -Wall -Wextra -pedantic" extra-sources="../examples/09-operator-overloading/rational-less.cpp ../examples/09-operator-overloading/rational-order.cpp ../examples/09-operator-overloading/rational-comparison-use.cpp" -->

[godbolt-09-less-impl]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Climits%3E%0A%23include+%3Cnumeric%3E%0A%23include+%3Cstdexcept%3E%0Astatic_assert(std::numeric_limits%3Cint%3E::digits+%3C+std::numeric_limits%3Clong+long%3E::digits)%3B%0A%0Ainline+void+normalize_rational(int%26+numerator,+int%26+denominator)+%7B%0A++++if+(denominator+%3D%3D+0)+%7B%0A++++++++throw+std::invalid_argument(%22denominator+must+be+nonzero%22)%3B%0A++++%7D%0A++++long+long+n+%3D+numerator,+d+%3D+denominator%3B%0A++++const+auto+divisor+%3D+std::gcd(n,+d)%3B%0A++++n+/%3D+divisor%3B%0A++++d+/%3D+divisor%3B%0A++++if+(d+%3C+0)+%7B%0A++++++++n+%3D+-n%3B%0A++++++++d+%3D+-d%3B%0A++++%7D%0A++++if+(n+%3C+std::numeric_limits%3Cint%3E::min()+%7C%7C+n+%3E+std::numeric_limits%3Cint%3E::max()%0A++++++++%7C%7C+d+%3E+std::numeric_limits%3Cint%3E::max())+%7B%0A++++++++throw+std::overflow_error(%22normalized+rational+does+not+fit+in+int%22)%3B%0A++++%7D%0A++++numerator+%3D+static_cast%3Cint%3E(n)%3B%0A++++denominator+%3D+static_cast%3Cint%3E(d)%3B%0A%7D%0A%0Aclass+Rational+%7B%0Apublic:%0A++++explicit+Rational(int+numerator+%3D+0,+int+denominator+%3D+1)%0A++++++++:+numerator_(numerator),+denominator_(denominator)+%7B%0A++++++++normalize_rational(numerator_,+denominator_)%3B%0A++++%7D%0A++++Rational(const+Rational%26)+%3D+default%3B%0A++++Rational%26+operator%3D(const+Rational%26+other)%3B%0A++++Rational%26+operator%2B%3D(const+Rational%26+rhs)%3B%0A++++Rational%26+operator%2B%2B()%3B%0A++++Rational+operator%2B%2B(int)%3B%0A++++explicit+operator+float()+const+%7B%0A++++++++return+static_cast%3Cfloat%3E(numerator_)+/+denominator_%3B%0A++++%7D%0A%0A++++int+numerator()+const+%7B+return+numerator_%3B+%7D%0A++++int+denominator()+const+%7B+return+denominator_%3B+%7D%0A%0Aprivate:%0A++++int+numerator_%3B%0A++++int+denominator_%3B%0A%7D%3B%0A%0Abool+operator%3D%3D(const+Rational%26+lhs,+const+Rational%26+rhs)%3B%0Abool+operator!!%3D(const+Rational%26+lhs,+const+Rational%26+rhs)%3B%0Abool+operator%3C(const+Rational%26+lhs,+const+Rational%26+rhs)%3B%0Abool+operator%3E(const+Rational%26+lhs,+const+Rational%26+rhs)%3B%0Abool+operator%3C%3D(const+Rational%26+lhs,+const+Rational%26+rhs)%3B%0Abool+operator%3E%3D(const+Rational%26+lhs,+const+Rational%26+rhs)%3B%0A%23include+%3Climits%3E%0A%0Astatic_assert(std::numeric_limits%3Clong+long%3E::digits%0A++++++++++++++%3E%3D+2+*+std::numeric_limits%3Cint%3E::digits)%3B%0A%0Abool+operator%3C(const+Rational%26+lhs,+const+Rational%26+rhs)+%7B%0A++++return+static_cast%3Clong+long%3E(lhs.numerator())+*+rhs.denominator()%0A+++++++++%3C+static_cast%3Clong+long%3E(rhs.numerator())+*+lhs.denominator()%3B%0A%7D%0A%0A%0A%0Abool+operator%3D%3D(const+Rational%26+lhs,+const+Rational%26+rhs)+%7B%0A++++return+lhs.numerator()+%3D%3D+rhs.numerator()%0A++++++++%26%26+lhs.denominator()+%3D%3D+rhs.denominator()%3B%0A%7D%0A%0Abool+operator!!%3D(const+Rational%26+lhs,+const+Rational%26+rhs)+%7B%0A++++return+!!(lhs+%3D%3D+rhs)%3B%0A%7D%0A%0A%0A%0Abool+operator%3E(const+Rational%26+lhs,+const+Rational%26+rhs)+%7B%0A++++return+rhs+%3C+lhs%3B%0A%7D%0A%0Abool+operator%3C%3D(const+Rational%26+lhs,+const+Rational%26+rhs)+%7B%0A++++return+!!(rhs+%3C+lhs)%3B%0A%7D%0A%0Abool+operator%3E%3D(const+Rational%26+lhs,+const+Rational%26+rhs)+%7B%0A++++return+!!(lhs+%3C+rhs)%3B%0A%7D%0A%0A%0A%23include+%3Ciostream%3E%0A%0Aint+main()+%7B%0A++++Rational+half%7B1,+2%7D,+same%7B2,+4%7D,+negative%7B-1,+3%7D%3B%0A++++std::cout+%3C%3C+std::boolalpha%3B%0A++++std::cout+%3C%3C+(half+%3D%3D+same)+%3C%3C+!'+!'+%3C%3C+(half+!!%3D+same)+%3C%3C+!'%5Cn!'%3B%0A++++std::cout+%3C%3C+(negative+%3C+half)+%3C%3C+!'+!'+%3C%3C+(half+%3E+negative)+%3C%3C+!'%5Cn!'%3B%0A++++std::cout+%3C%3C+(half+%3C%3D+same)+%3C%3C+!'+!'+%3C%3C+(half+%3E%3D+same)+%3C%3C+!'%5Cn!'%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0+-Wall+-Wextra+-pedantic',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/09-operator-overloading/rational-less.cpp" compiler="clang2310" options="-std=c++20 -O0 -Wall -Wextra -pedantic" extra-sources="../examples/09-operator-overloading/rational-equality.cpp ../examples/09-operator-overloading/rational-order.cpp ../examples/09-operator-overloading/rational-comparison-use.cpp" -->

[godbolt-09-order-impl]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Climits%3E%0A%23include+%3Cnumeric%3E%0A%23include+%3Cstdexcept%3E%0Astatic_assert(std::numeric_limits%3Cint%3E::digits+%3C+std::numeric_limits%3Clong+long%3E::digits)%3B%0A%0Ainline+void+normalize_rational(int%26+numerator,+int%26+denominator)+%7B%0A++++if+(denominator+%3D%3D+0)+%7B%0A++++++++throw+std::invalid_argument(%22denominator+must+be+nonzero%22)%3B%0A++++%7D%0A++++long+long+n+%3D+numerator,+d+%3D+denominator%3B%0A++++const+auto+divisor+%3D+std::gcd(n,+d)%3B%0A++++n+/%3D+divisor%3B%0A++++d+/%3D+divisor%3B%0A++++if+(d+%3C+0)+%7B%0A++++++++n+%3D+-n%3B%0A++++++++d+%3D+-d%3B%0A++++%7D%0A++++if+(n+%3C+std::numeric_limits%3Cint%3E::min()+%7C%7C+n+%3E+std::numeric_limits%3Cint%3E::max()%0A++++++++%7C%7C+d+%3E+std::numeric_limits%3Cint%3E::max())+%7B%0A++++++++throw+std::overflow_error(%22normalized+rational+does+not+fit+in+int%22)%3B%0A++++%7D%0A++++numerator+%3D+static_cast%3Cint%3E(n)%3B%0A++++denominator+%3D+static_cast%3Cint%3E(d)%3B%0A%7D%0A%0Aclass+Rational+%7B%0Apublic:%0A++++explicit+Rational(int+numerator+%3D+0,+int+denominator+%3D+1)%0A++++++++:+numerator_(numerator),+denominator_(denominator)+%7B%0A++++++++normalize_rational(numerator_,+denominator_)%3B%0A++++%7D%0A++++Rational(const+Rational%26)+%3D+default%3B%0A++++Rational%26+operator%3D(const+Rational%26+other)%3B%0A++++Rational%26+operator%2B%3D(const+Rational%26+rhs)%3B%0A++++Rational%26+operator%2B%2B()%3B%0A++++Rational+operator%2B%2B(int)%3B%0A++++explicit+operator+float()+const+%7B%0A++++++++return+static_cast%3Cfloat%3E(numerator_)+/+denominator_%3B%0A++++%7D%0A%0A++++int+numerator()+const+%7B+return+numerator_%3B+%7D%0A++++int+denominator()+const+%7B+return+denominator_%3B+%7D%0A%0Aprivate:%0A++++int+numerator_%3B%0A++++int+denominator_%3B%0A%7D%3B%0A%0Abool+operator%3D%3D(const+Rational%26+lhs,+const+Rational%26+rhs)%3B%0Abool+operator!!%3D(const+Rational%26+lhs,+const+Rational%26+rhs)%3B%0Abool+operator%3C(const+Rational%26+lhs,+const+Rational%26+rhs)%3B%0Abool+operator%3E(const+Rational%26+lhs,+const+Rational%26+rhs)%3B%0Abool+operator%3C%3D(const+Rational%26+lhs,+const+Rational%26+rhs)%3B%0Abool+operator%3E%3D(const+Rational%26+lhs,+const+Rational%26+rhs)%3B%0A%0Abool+operator%3E(const+Rational%26+lhs,+const+Rational%26+rhs)+%7B%0A++++return+rhs+%3C+lhs%3B%0A%7D%0A%0Abool+operator%3C%3D(const+Rational%26+lhs,+const+Rational%26+rhs)+%7B%0A++++return+!!(rhs+%3C+lhs)%3B%0A%7D%0A%0Abool+operator%3E%3D(const+Rational%26+lhs,+const+Rational%26+rhs)+%7B%0A++++return+!!(lhs+%3C+rhs)%3B%0A%7D%0A%0A%0A%0Abool+operator%3D%3D(const+Rational%26+lhs,+const+Rational%26+rhs)+%7B%0A++++return+lhs.numerator()+%3D%3D+rhs.numerator()%0A++++++++%26%26+lhs.denominator()+%3D%3D+rhs.denominator()%3B%0A%7D%0A%0Abool+operator!!%3D(const+Rational%26+lhs,+const+Rational%26+rhs)+%7B%0A++++return+!!(lhs+%3D%3D+rhs)%3B%0A%7D%0A%0A%0A%23include+%3Climits%3E%0A%0Astatic_assert(std::numeric_limits%3Clong+long%3E::digits%0A++++++++++++++%3E%3D+2+*+std::numeric_limits%3Cint%3E::digits)%3B%0A%0Abool+operator%3C(const+Rational%26+lhs,+const+Rational%26+rhs)+%7B%0A++++return+static_cast%3Clong+long%3E(lhs.numerator())+*+rhs.denominator()%0A+++++++++%3C+static_cast%3Clong+long%3E(rhs.numerator())+*+lhs.denominator()%3B%0A%7D%0A%0A%0A%23include+%3Ciostream%3E%0A%0Aint+main()+%7B%0A++++Rational+half%7B1,+2%7D,+same%7B2,+4%7D,+negative%7B-1,+3%7D%3B%0A++++std::cout+%3C%3C+std::boolalpha%3B%0A++++std::cout+%3C%3C+(half+%3D%3D+same)+%3C%3C+!'+!'+%3C%3C+(half+!!%3D+same)+%3C%3C+!'%5Cn!'%3B%0A++++std::cout+%3C%3C+(negative+%3C+half)+%3C%3C+!'+!'+%3C%3C+(half+%3E+negative)+%3C%3C+!'%5Cn!'%3B%0A++++std::cout+%3C%3C+(half+%3C%3D+same)+%3C%3C+!'+!'+%3C%3C+(half+%3E%3D+same)+%3C%3C+!'%5Cn!'%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0+-Wall+-Wextra+-pedantic',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/09-operator-overloading/rational-order.cpp" compiler="clang2310" options="-std=c++20 -O0 -Wall -Wextra -pedantic" extra-sources="../examples/09-operator-overloading/rational-equality.cpp ../examples/09-operator-overloading/rational-less.cpp ../examples/09-operator-overloading/rational-comparison-use.cpp" -->

[godbolt-09-prefix-impl]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Climits%3E%0A%23include+%3Cnumeric%3E%0A%23include+%3Cstdexcept%3E%0Astatic_assert(std::numeric_limits%3Cint%3E::digits+%3C+std::numeric_limits%3Clong+long%3E::digits)%3B%0A%0Ainline+void+normalize_rational(int%26+numerator,+int%26+denominator)+%7B%0A++++if+(denominator+%3D%3D+0)+%7B%0A++++++++throw+std::invalid_argument(%22denominator+must+be+nonzero%22)%3B%0A++++%7D%0A++++long+long+n+%3D+numerator,+d+%3D+denominator%3B%0A++++const+auto+divisor+%3D+std::gcd(n,+d)%3B%0A++++n+/%3D+divisor%3B%0A++++d+/%3D+divisor%3B%0A++++if+(d+%3C+0)+%7B%0A++++++++n+%3D+-n%3B%0A++++++++d+%3D+-d%3B%0A++++%7D%0A++++if+(n+%3C+std::numeric_limits%3Cint%3E::min()+%7C%7C+n+%3E+std::numeric_limits%3Cint%3E::max()%0A++++++++%7C%7C+d+%3E+std::numeric_limits%3Cint%3E::max())+%7B%0A++++++++throw+std::overflow_error(%22normalized+rational+does+not+fit+in+int%22)%3B%0A++++%7D%0A++++numerator+%3D+static_cast%3Cint%3E(n)%3B%0A++++denominator+%3D+static_cast%3Cint%3E(d)%3B%0A%7D%0A%0Aclass+Rational+%7B%0Apublic:%0A++++explicit+Rational(int+numerator+%3D+0,+int+denominator+%3D+1)%0A++++++++:+numerator_(numerator),+denominator_(denominator)+%7B%0A++++++++normalize_rational(numerator_,+denominator_)%3B%0A++++%7D%0A++++Rational(const+Rational%26)+%3D+default%3B%0A++++Rational%26+operator%3D(const+Rational%26+other)%3B%0A++++Rational%26+operator%2B%3D(const+Rational%26+rhs)%3B%0A++++Rational%26+operator%2B%2B()%3B%0A++++Rational+operator%2B%2B(int)%3B%0A++++explicit+operator+float()+const+%7B%0A++++++++return+static_cast%3Cfloat%3E(numerator_)+/+denominator_%3B%0A++++%7D%0A%0A++++int+numerator()+const+%7B+return+numerator_%3B+%7D%0A++++int+denominator()+const+%7B+return+denominator_%3B+%7D%0A%0Aprivate:%0A++++int+numerator_%3B%0A++++int+denominator_%3B%0A%7D%3B%0A%23include+%3Climits%3E%0A%23include+%3Cstdexcept%3E%0A%0ARational%26+Rational::operator%2B%2B()+%7B%0A++++if+(numerator_+%3E+std::numeric_limits%3Cint%3E::max()+-+denominator_)+%7B%0A++++++++throw+std::overflow_error(%22increment+does+not+fit+in+int%22)%3B%0A++++%7D%0A++++numerator_+%2B%3D+denominator_%3B%0A++++return+*this%3B%0A%7D%0A%0A%0A%0ARational+Rational::operator%2B%2B(int)+%7B%0A++++Rational+previous%7B*this%7D%3B%0A++++%2B%2B*this%3B%0A++++return+previous%3B%0A%7D%0A%0A%0A%23include+%3Ciosfwd%3E%0A%0Astd::ostream%26+operator%3C%3C(std::ostream%26+stream,+const+Rational%26+value)%3B%0Astd::istream%26+operator%3E%3E(std::istream%26+stream,+Rational%26+value)%3B%0A%23include+%3Costream%3E%0A%0Astd::ostream%26+operator%3C%3C(std::ostream%26+stream,+const+Rational%26+value)+%7B%0A++++stream+%3C%3C+value.numerator()+%3C%3C+!'/!'+%3C%3C+value.denominator()%3B%0A++++return+stream%3B%0A%7D%0A%0A%0A%23include+%3Ciostream%3E%0A%0Aint+main()+%7B%0A++++Rational+value%7B1,+2%7D%3B%0A++++Rational+previous+%3D+value%2B%2B%3B%0A++++std::cout+%3C%3C+previous+%3C%3C+!'+!'+%3C%3C+value+%3C%3C+!'%5Cn!'%3B%0A++++Rational%26+current+%3D+%2B%2Bvalue%3B%0A++++std::cout+%3C%3C+current+%3C%3C+!'+!'+%3C%3C+(%26current+%3D%3D+%26value)+%3C%3C+!'%5Cn!'%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0+-Wall+-Wextra+-pedantic',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/09-operator-overloading/rational-prefix.cpp" compiler="clang2310" options="-std=c++20 -O0 -Wall -Wextra -pedantic" extra-sources="../examples/09-operator-overloading/rational-postfix.cpp ../examples/09-operator-overloading/rational-output.cpp ../examples/09-operator-overloading/rational-increment-use.cpp" -->

[godbolt-09-postfix-impl]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Climits%3E%0A%23include+%3Cnumeric%3E%0A%23include+%3Cstdexcept%3E%0Astatic_assert(std::numeric_limits%3Cint%3E::digits+%3C+std::numeric_limits%3Clong+long%3E::digits)%3B%0A%0Ainline+void+normalize_rational(int%26+numerator,+int%26+denominator)+%7B%0A++++if+(denominator+%3D%3D+0)+%7B%0A++++++++throw+std::invalid_argument(%22denominator+must+be+nonzero%22)%3B%0A++++%7D%0A++++long+long+n+%3D+numerator,+d+%3D+denominator%3B%0A++++const+auto+divisor+%3D+std::gcd(n,+d)%3B%0A++++n+/%3D+divisor%3B%0A++++d+/%3D+divisor%3B%0A++++if+(d+%3C+0)+%7B%0A++++++++n+%3D+-n%3B%0A++++++++d+%3D+-d%3B%0A++++%7D%0A++++if+(n+%3C+std::numeric_limits%3Cint%3E::min()+%7C%7C+n+%3E+std::numeric_limits%3Cint%3E::max()%0A++++++++%7C%7C+d+%3E+std::numeric_limits%3Cint%3E::max())+%7B%0A++++++++throw+std::overflow_error(%22normalized+rational+does+not+fit+in+int%22)%3B%0A++++%7D%0A++++numerator+%3D+static_cast%3Cint%3E(n)%3B%0A++++denominator+%3D+static_cast%3Cint%3E(d)%3B%0A%7D%0A%0Aclass+Rational+%7B%0Apublic:%0A++++explicit+Rational(int+numerator+%3D+0,+int+denominator+%3D+1)%0A++++++++:+numerator_(numerator),+denominator_(denominator)+%7B%0A++++++++normalize_rational(numerator_,+denominator_)%3B%0A++++%7D%0A++++Rational(const+Rational%26)+%3D+default%3B%0A++++Rational%26+operator%3D(const+Rational%26+other)%3B%0A++++Rational%26+operator%2B%3D(const+Rational%26+rhs)%3B%0A++++Rational%26+operator%2B%2B()%3B%0A++++Rational+operator%2B%2B(int)%3B%0A++++explicit+operator+float()+const+%7B%0A++++++++return+static_cast%3Cfloat%3E(numerator_)+/+denominator_%3B%0A++++%7D%0A%0A++++int+numerator()+const+%7B+return+numerator_%3B+%7D%0A++++int+denominator()+const+%7B+return+denominator_%3B+%7D%0A%0Aprivate:%0A++++int+numerator_%3B%0A++++int+denominator_%3B%0A%7D%3B%0A%0ARational+Rational::operator%2B%2B(int)+%7B%0A++++Rational+previous%7B*this%7D%3B%0A++++%2B%2B*this%3B%0A++++return+previous%3B%0A%7D%0A%0A%0A%23include+%3Climits%3E%0A%23include+%3Cstdexcept%3E%0A%0ARational%26+Rational::operator%2B%2B()+%7B%0A++++if+(numerator_+%3E+std::numeric_limits%3Cint%3E::max()+-+denominator_)+%7B%0A++++++++throw+std::overflow_error(%22increment+does+not+fit+in+int%22)%3B%0A++++%7D%0A++++numerator_+%2B%3D+denominator_%3B%0A++++return+*this%3B%0A%7D%0A%0A%0A%23include+%3Ciosfwd%3E%0A%0Astd::ostream%26+operator%3C%3C(std::ostream%26+stream,+const+Rational%26+value)%3B%0Astd::istream%26+operator%3E%3E(std::istream%26+stream,+Rational%26+value)%3B%0A%23include+%3Costream%3E%0A%0Astd::ostream%26+operator%3C%3C(std::ostream%26+stream,+const+Rational%26+value)+%7B%0A++++stream+%3C%3C+value.numerator()+%3C%3C+!'/!'+%3C%3C+value.denominator()%3B%0A++++return+stream%3B%0A%7D%0A%0A%0A%23include+%3Ciostream%3E%0A%0Aint+main()+%7B%0A++++Rational+value%7B1,+2%7D%3B%0A++++Rational+previous+%3D+value%2B%2B%3B%0A++++std::cout+%3C%3C+previous+%3C%3C+!'+!'+%3C%3C+value+%3C%3C+!'%5Cn!'%3B%0A++++Rational%26+current+%3D+%2B%2Bvalue%3B%0A++++std::cout+%3C%3C+current+%3C%3C+!'+!'+%3C%3C+(%26current+%3D%3D+%26value)+%3C%3C+!'%5Cn!'%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0+-Wall+-Wextra+-pedantic',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/09-operator-overloading/rational-postfix.cpp" compiler="clang2310" options="-std=c++20 -O0 -Wall -Wextra -pedantic" extra-sources="../examples/09-operator-overloading/rational-prefix.cpp ../examples/09-operator-overloading/rational-output.cpp ../examples/09-operator-overloading/rational-increment-use.cpp" -->

[godbolt-09-friend-impl]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Climits%3E%0A%23include+%3Cnumeric%3E%0A%23include+%3Cstdexcept%3E%0Astatic_assert(std::numeric_limits%3Cint%3E::digits+%3C+std::numeric_limits%3Clong+long%3E::digits)%3B%0A%0Ainline+void+normalize_rational(int%26+numerator,+int%26+denominator)+%7B%0A++++if+(denominator+%3D%3D+0)+%7B%0A++++++++throw+std::invalid_argument(%22denominator+must+be+nonzero%22)%3B%0A++++%7D%0A++++long+long+n+%3D+numerator,+d+%3D+denominator%3B%0A++++const+auto+divisor+%3D+std::gcd(n,+d)%3B%0A++++n+/%3D+divisor%3B%0A++++d+/%3D+divisor%3B%0A++++if+(d+%3C+0)+%7B%0A++++++++n+%3D+-n%3B%0A++++++++d+%3D+-d%3B%0A++++%7D%0A++++if+(n+%3C+std::numeric_limits%3Cint%3E::min()+%7C%7C+n+%3E+std::numeric_limits%3Cint%3E::max()%0A++++++++%7C%7C+d+%3E+std::numeric_limits%3Cint%3E::max())+%7B%0A++++++++throw+std::overflow_error(%22normalized+rational+does+not+fit+in+int%22)%3B%0A++++%7D%0A++++numerator+%3D+static_cast%3Cint%3E(n)%3B%0A++++denominator+%3D+static_cast%3Cint%3E(d)%3B%0A%7D%0A%23include+%3Ciosfwd%3E%0A%0Aclass+Rational+%7B%0Apublic:%0A++++explicit+Rational(int+numerator+%3D+0,+int+denominator+%3D+1)%0A++++++++:+numerator_(numerator),+denominator_(denominator)+%7B%0A++++++++normalize_rational(numerator_,+denominator_)%3B%0A++++%7D%0A++++friend+std::ostream%26+operator%3C%3C(std::ostream%26+stream,%0A++++++++++++++++++++++++++++++++++++const+Rational%26+value)%3B%0A%0Aprivate:%0A++++int+numerator_%3B%0A++++int+denominator_%3B%0A%7D%3B%0A%23include+%3Costream%3E%0A%0Astd::ostream%26+operator%3C%3C(std::ostream%26+stream,%0A+++++++++++++++++++++++++const+Rational%26+value)+%7B%0A++++stream+%3C%3C+value.numerator_+%3C%3C+!'/!'+%3C%3C+value.denominator_%3B%0A++++return+stream%3B%0A%7D%0A%0A%0A%23include+%3Ciostream%3E%0A%0Aint+main()+%7B%0A++++std::cout+%3C%3C+Rational%7B2,+4%7D+%3C%3C+!'%5Cn!'%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0+-Wall+-Wextra+-pedantic',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/09-operator-overloading/friend-output.cpp" compiler="clang2310" options="-std=c++20 -O0 -Wall -Wextra -pedantic" extra-sources="../examples/09-operator-overloading/friend-use.cpp" -->

[godbolt-09-pointer-impl]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%0Aclass+Foo+%7B%0Apublic:%0A++++int+foo()+const+%7B+return+value_%3B+%7D%0A%0Aprivate:%0A++++int+value_+%3D+2025%3B%0A%7D%3B%0A%0Aclass+FooPtr+%7B%0Apublic:%0A++++explicit+FooPtr(Foo*+ptr+%3D+nullptr)+:+ptr_(ptr)+%7B%7D%0A++++~FooPtr()+%7B+delete+ptr_%3B+%7D%0A++++FooPtr(const+FooPtr%26)+%3D+delete%3B%0A++++FooPtr%26+operator%3D(const+FooPtr%26)+%3D+delete%3B%0A%0A++++Foo%26+operator*()+const%3B%0A++++Foo*+operator-%3E()+const%3B%0A%0Aprivate:%0A++++Foo*+ptr_%3B%0A%7D%3B%0A%23include+%3Ccassert%3E%0A%0AFoo%26+FooPtr::operator*()+const+%7B%0A++++assert(ptr_+!!%3D+nullptr)%3B%0A++++return+*ptr_%3B%0A%7D%0A%0AFoo*+FooPtr::operator-%3E()+const+%7B%0A++++assert(ptr_+!!%3D+nullptr)%3B%0A++++return+ptr_%3B%0A%7D%0A%0A%0A%23include+%3Ciostream%3E%0A%0Aint+main()+%7B%0A++++FooPtr+pointer%7Bnew+Foo%7D%3B%0A++++std::cout+%3C%3C+pointer-%3Efoo()+%3C%3C+!'%5Cn!'%3B%0A++++std::cout+%3C%3C+(*pointer).foo()+%3C%3C+!'%5Cn!'%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0+-Wall+-Wextra+-pedantic',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/09-operator-overloading/foo-ptr-access.cpp" compiler="clang2310" options="-std=c++20 -O0 -Wall -Wextra -pedantic" extra-sources="../examples/09-operator-overloading/foo-ptr-use.cpp" -->

[godbolt-09-add-assign]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Climits%3E%0A%23include+%3Cnumeric%3E%0A%23include+%3Cstdexcept%3E%0Astatic_assert(std::numeric_limits%3Cint%3E::digits+%3C+std::numeric_limits%3Clong+long%3E::digits)%3B%0A%0Ainline+void+normalize_rational(int%26+numerator,+int%26+denominator)+%7B%0A++++if+(denominator+%3D%3D+0)+%7B%0A++++++++throw+std::invalid_argument(%22denominator+must+be+nonzero%22)%3B%0A++++%7D%0A++++long+long+n+%3D+numerator,+d+%3D+denominator%3B%0A++++const+auto+divisor+%3D+std::gcd(n,+d)%3B%0A++++n+/%3D+divisor%3B%0A++++d+/%3D+divisor%3B%0A++++if+(d+%3C+0)+%7B%0A++++++++n+%3D+-n%3B%0A++++++++d+%3D+-d%3B%0A++++%7D%0A++++if+(n+%3C+std::numeric_limits%3Cint%3E::min()+%7C%7C+n+%3E+std::numeric_limits%3Cint%3E::max()%0A++++++++%7C%7C+d+%3E+std::numeric_limits%3Cint%3E::max())+%7B%0A++++++++throw+std::overflow_error(%22normalized+rational+does+not+fit+in+int%22)%3B%0A++++%7D%0A++++numerator+%3D+static_cast%3Cint%3E(n)%3B%0A++++denominator+%3D+static_cast%3Cint%3E(d)%3B%0A%7D%0A%0Aclass+Rational+%7B%0Apublic:%0A++++explicit+Rational(int+numerator+%3D+0,+int+denominator+%3D+1)%0A++++++++:+numerator_(numerator),+denominator_(denominator)+%7B%0A++++++++normalize_rational(numerator_,+denominator_)%3B%0A++++%7D%0A++++Rational(const+Rational%26)+%3D+default%3B%0A++++Rational%26+operator%3D(const+Rational%26+other)%3B%0A++++Rational%26+operator%2B%3D(const+Rational%26+rhs)%3B%0A++++Rational%26+operator%2B%2B()%3B%0A++++Rational+operator%2B%2B(int)%3B%0A++++explicit+operator+float()+const+%7B%0A++++++++return+static_cast%3Cfloat%3E(numerator_)+/+denominator_%3B%0A++++%7D%0A%0A++++int+numerator()+const+%7B+return+numerator_%3B+%7D%0A++++int+denominator()+const+%7B+return+denominator_%3B+%7D%0A%0Aprivate:%0A++++int+numerator_%3B%0A++++int+denominator_%3B%0A%7D%3B%0A%0A%23include+%3Climits%3E%0A%23include+%3Cnumeric%3E%0A%23include+%3Cstdexcept%3E%0A%0Astatic_assert(std::numeric_limits%3Clong+long%3E::digits%0A++++++++++++++%3E%3D+2+*+std::numeric_limits%3Cint%3E::digits+%2B+1)%3B%0A%0Ainline+Rational+add_rationals(const+Rational%26+lhs,+const+Rational%26+rhs)+%7B%0A++++long+long+numerator+%3D+static_cast%3Clong+long%3E(lhs.numerator())+*+rhs.denominator()%0A++++++++++++++++++++++++%2B+static_cast%3Clong+long%3E(rhs.numerator())+*+lhs.denominator()%3B%0A++++long+long+denominator+%3D+static_cast%3Clong+long%3E(lhs.denominator())+*+rhs.denominator()%3B%0A++++const+auto+divisor+%3D+std::gcd(numerator,+denominator)%3B%0A++++numerator+/%3D+divisor%3B%0A++++denominator+/%3D+divisor%3B%0A++++if+(numerator+%3C+std::numeric_limits%3Cint%3E::min()%0A++++++++%7C%7C+numerator+%3E+std::numeric_limits%3Cint%3E::max()%0A++++++++%7C%7C+denominator+%3E+std::numeric_limits%3Cint%3E::max())+%7B%0A++++++++throw+std::overflow_error(%22sum+does+not+fit+in+Rational%22)%3B%0A++++%7D%0A++++return+Rational%7Bstatic_cast%3Cint%3E(numerator),+static_cast%3Cint%3E(denominator)%7D%3B%0A%7D%0A%0ARational%26+Rational::operator%2B%3D(const+Rational%26+rhs)+%7B%0A++++*this+%3D+add_rationals(*this,+rhs)%3B%0A++++return+*this%3B%0A%7D%0A%0A%0A%0ARational+operator%2B(Rational+lhs,+const+Rational%26+rhs)%3B%0A%0ARational+operator%2B(Rational+lhs,+const+Rational%26+rhs)+%7B%0A++++lhs+%2B%3D+rhs%3B%0A++++return+lhs%3B%0A%7D%0A%0A%0A%0ARational%26+Rational::operator%3D(const+Rational%26+other)+%7B%0A++++numerator_+%3D+other.numerator_%3B%0A++++denominator_+%3D+other.denominator_%3B%0A++++return+*this%3B%0A%7D%0A%0A%0A%23include+%3Ciosfwd%3E%0A%0Astd::ostream%26+operator%3C%3C(std::ostream%26+stream,+const+Rational%26+value)%3B%0Astd::istream%26+operator%3E%3E(std::istream%26+stream,+Rational%26+value)%3B%0A%23include+%3Costream%3E%0A%0Astd::ostream%26+operator%3C%3C(std::ostream%26+stream,+const+Rational%26+value)+%7B%0A++++stream+%3C%3C+value.numerator()+%3C%3C+!'/!'+%3C%3C+value.denominator()%3B%0A++++return+stream%3B%0A%7D%0A%0A%0A%0A%23include+%3Ciostream%3E%0A%0Aint+main()+%7B%0A++++Rational+first%7B1,+2%7D,+second%7B1,+3%7D%3B%0A++++Rational+sum+%3D+first+%2B+second%3B%0A++++std::cout+%3C%3C+first+%3C%3C+!'+!'+%3C%3C+second+%3C%3C+!'+!'+%3C%3C+sum+%3C%3C+!'%5Cn!'%3B%0A%0A++++first+%2B%3D+second%3B%0A++++std::cout+%3C%3C+first+%3C%3C+!'%5Cn!'%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0+-Wall+-Wextra+-pedantic',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/09-operator-overloading/rational-add-assign.cpp" compiler="clang2310" options="-std=c++20 -O0 -Wall -Wextra -pedantic" extra-sources="../examples/09-operator-overloading/rational-add.cpp ../examples/09-operator-overloading/rational-assignment.cpp ../examples/09-operator-overloading/rational-output.cpp ../examples/09-operator-overloading/rational-addition-use.cpp" -->

[godbolt-09-add]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Climits%3E%0A%23include+%3Cnumeric%3E%0A%23include+%3Cstdexcept%3E%0Astatic_assert(std::numeric_limits%3Cint%3E::digits+%3C+std::numeric_limits%3Clong+long%3E::digits)%3B%0A%0Ainline+void+normalize_rational(int%26+numerator,+int%26+denominator)+%7B%0A++++if+(denominator+%3D%3D+0)+%7B%0A++++++++throw+std::invalid_argument(%22denominator+must+be+nonzero%22)%3B%0A++++%7D%0A++++long+long+n+%3D+numerator,+d+%3D+denominator%3B%0A++++const+auto+divisor+%3D+std::gcd(n,+d)%3B%0A++++n+/%3D+divisor%3B%0A++++d+/%3D+divisor%3B%0A++++if+(d+%3C+0)+%7B%0A++++++++n+%3D+-n%3B%0A++++++++d+%3D+-d%3B%0A++++%7D%0A++++if+(n+%3C+std::numeric_limits%3Cint%3E::min()+%7C%7C+n+%3E+std::numeric_limits%3Cint%3E::max()%0A++++++++%7C%7C+d+%3E+std::numeric_limits%3Cint%3E::max())+%7B%0A++++++++throw+std::overflow_error(%22normalized+rational+does+not+fit+in+int%22)%3B%0A++++%7D%0A++++numerator+%3D+static_cast%3Cint%3E(n)%3B%0A++++denominator+%3D+static_cast%3Cint%3E(d)%3B%0A%7D%0A%0Aclass+Rational+%7B%0Apublic:%0A++++explicit+Rational(int+numerator+%3D+0,+int+denominator+%3D+1)%0A++++++++:+numerator_(numerator),+denominator_(denominator)+%7B%0A++++++++normalize_rational(numerator_,+denominator_)%3B%0A++++%7D%0A++++Rational(const+Rational%26)+%3D+default%3B%0A++++Rational%26+operator%3D(const+Rational%26+other)%3B%0A++++Rational%26+operator%2B%3D(const+Rational%26+rhs)%3B%0A++++Rational%26+operator%2B%2B()%3B%0A++++Rational+operator%2B%2B(int)%3B%0A++++explicit+operator+float()+const+%7B%0A++++++++return+static_cast%3Cfloat%3E(numerator_)+/+denominator_%3B%0A++++%7D%0A%0A++++int+numerator()+const+%7B+return+numerator_%3B+%7D%0A++++int+denominator()+const+%7B+return+denominator_%3B+%7D%0A%0Aprivate:%0A++++int+numerator_%3B%0A++++int+denominator_%3B%0A%7D%3B%0A%0ARational+operator%2B(Rational+lhs,+const+Rational%26+rhs)%3B%0A%0ARational+operator%2B(Rational+lhs,+const+Rational%26+rhs)+%7B%0A++++lhs+%2B%3D+rhs%3B%0A++++return+lhs%3B%0A%7D%0A%0A%0A%0A%23include+%3Climits%3E%0A%23include+%3Cnumeric%3E%0A%23include+%3Cstdexcept%3E%0A%0Astatic_assert(std::numeric_limits%3Clong+long%3E::digits%0A++++++++++++++%3E%3D+2+*+std::numeric_limits%3Cint%3E::digits+%2B+1)%3B%0A%0Ainline+Rational+add_rationals(const+Rational%26+lhs,+const+Rational%26+rhs)+%7B%0A++++long+long+numerator+%3D+static_cast%3Clong+long%3E(lhs.numerator())+*+rhs.denominator()%0A++++++++++++++++++++++++%2B+static_cast%3Clong+long%3E(rhs.numerator())+*+lhs.denominator()%3B%0A++++long+long+denominator+%3D+static_cast%3Clong+long%3E(lhs.denominator())+*+rhs.denominator()%3B%0A++++const+auto+divisor+%3D+std::gcd(numerator,+denominator)%3B%0A++++numerator+/%3D+divisor%3B%0A++++denominator+/%3D+divisor%3B%0A++++if+(numerator+%3C+std::numeric_limits%3Cint%3E::min()%0A++++++++%7C%7C+numerator+%3E+std::numeric_limits%3Cint%3E::max()%0A++++++++%7C%7C+denominator+%3E+std::numeric_limits%3Cint%3E::max())+%7B%0A++++++++throw+std::overflow_error(%22sum+does+not+fit+in+Rational%22)%3B%0A++++%7D%0A++++return+Rational%7Bstatic_cast%3Cint%3E(numerator),+static_cast%3Cint%3E(denominator)%7D%3B%0A%7D%0A%0ARational%26+Rational::operator%2B%3D(const+Rational%26+rhs)+%7B%0A++++*this+%3D+add_rationals(*this,+rhs)%3B%0A++++return+*this%3B%0A%7D%0A%0A%0A%0ARational%26+Rational::operator%3D(const+Rational%26+other)+%7B%0A++++numerator_+%3D+other.numerator_%3B%0A++++denominator_+%3D+other.denominator_%3B%0A++++return+*this%3B%0A%7D%0A%0A%0A%23include+%3Ciosfwd%3E%0A%0Astd::ostream%26+operator%3C%3C(std::ostream%26+stream,+const+Rational%26+value)%3B%0Astd::istream%26+operator%3E%3E(std::istream%26+stream,+Rational%26+value)%3B%0A%23include+%3Costream%3E%0A%0Astd::ostream%26+operator%3C%3C(std::ostream%26+stream,+const+Rational%26+value)+%7B%0A++++stream+%3C%3C+value.numerator()+%3C%3C+!'/!'+%3C%3C+value.denominator()%3B%0A++++return+stream%3B%0A%7D%0A%0A%0A%0A%23include+%3Ciostream%3E%0A%0Aint+main()+%7B%0A++++Rational+first%7B1,+2%7D,+second%7B1,+3%7D%3B%0A++++Rational+sum+%3D+first+%2B+second%3B%0A++++std::cout+%3C%3C+first+%3C%3C+!'+!'+%3C%3C+second+%3C%3C+!'+!'+%3C%3C+sum+%3C%3C+!'%5Cn!'%3B%0A%0A++++first+%2B%3D+second%3B%0A++++std::cout+%3C%3C+first+%3C%3C+!'%5Cn!'%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0+-Wall+-Wextra+-pedantic',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/09-operator-overloading/rational-add.cpp" compiler="clang2310" options="-std=c++20 -O0 -Wall -Wextra -pedantic" extra-sources="../examples/09-operator-overloading/rational-add-assign.cpp ../examples/09-operator-overloading/rational-assignment.cpp ../examples/09-operator-overloading/rational-output.cpp ../examples/09-operator-overloading/rational-addition-use.cpp" -->

[godbolt-09-addition]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Climits%3E%0A%23include+%3Cnumeric%3E%0A%23include+%3Cstdexcept%3E%0Astatic_assert(std::numeric_limits%3Cint%3E::digits+%3C+std::numeric_limits%3Clong+long%3E::digits)%3B%0A%0Ainline+void+normalize_rational(int%26+numerator,+int%26+denominator)+%7B%0A++++if+(denominator+%3D%3D+0)+%7B%0A++++++++throw+std::invalid_argument(%22denominator+must+be+nonzero%22)%3B%0A++++%7D%0A++++long+long+n+%3D+numerator,+d+%3D+denominator%3B%0A++++const+auto+divisor+%3D+std::gcd(n,+d)%3B%0A++++n+/%3D+divisor%3B%0A++++d+/%3D+divisor%3B%0A++++if+(d+%3C+0)+%7B%0A++++++++n+%3D+-n%3B%0A++++++++d+%3D+-d%3B%0A++++%7D%0A++++if+(n+%3C+std::numeric_limits%3Cint%3E::min()+%7C%7C+n+%3E+std::numeric_limits%3Cint%3E::max()%0A++++++++%7C%7C+d+%3E+std::numeric_limits%3Cint%3E::max())+%7B%0A++++++++throw+std::overflow_error(%22normalized+rational+does+not+fit+in+int%22)%3B%0A++++%7D%0A++++numerator+%3D+static_cast%3Cint%3E(n)%3B%0A++++denominator+%3D+static_cast%3Cint%3E(d)%3B%0A%7D%0A%0Aclass+Rational+%7B%0Apublic:%0A++++explicit+Rational(int+numerator+%3D+0,+int+denominator+%3D+1)%0A++++++++:+numerator_(numerator),+denominator_(denominator)+%7B%0A++++++++normalize_rational(numerator_,+denominator_)%3B%0A++++%7D%0A++++Rational(const+Rational%26)+%3D+default%3B%0A++++Rational%26+operator%3D(const+Rational%26+other)%3B%0A++++Rational%26+operator%2B%3D(const+Rational%26+rhs)%3B%0A++++Rational%26+operator%2B%2B()%3B%0A++++Rational+operator%2B%2B(int)%3B%0A++++explicit+operator+float()+const+%7B%0A++++++++return+static_cast%3Cfloat%3E(numerator_)+/+denominator_%3B%0A++++%7D%0A%0A++++int+numerator()+const+%7B+return+numerator_%3B+%7D%0A++++int+denominator()+const+%7B+return+denominator_%3B+%7D%0A%0Aprivate:%0A++++int+numerator_%3B%0A++++int+denominator_%3B%0A%7D%3B%0A%0ARational+operator%2B(Rational+lhs,+const+Rational%26+rhs)%3B%0A%0A%23include+%3Ciosfwd%3E%0A%0Astd::ostream%26+operator%3C%3C(std::ostream%26+stream,+const+Rational%26+value)%3B%0Astd::istream%26+operator%3E%3E(std::istream%26+stream,+Rational%26+value)%3B%0A%23include+%3Ciostream%3E%0A%0Aint+main()+%7B%0A++++Rational+first%7B1,+2%7D,+second%7B1,+3%7D%3B%0A++++Rational+sum+%3D+first+%2B+second%3B%0A++++std::cout+%3C%3C+first+%3C%3C+!'+!'+%3C%3C+second+%3C%3C+!'+!'+%3C%3C+sum+%3C%3C+!'%5Cn!'%3B%0A%0A++++first+%2B%3D+second%3B%0A++++std::cout+%3C%3C+first+%3C%3C+!'%5Cn!'%3B%0A%7D%0A%0A%0A%0ARational+operator%2B(Rational+lhs,+const+Rational%26+rhs)+%7B%0A++++lhs+%2B%3D+rhs%3B%0A++++return+lhs%3B%0A%7D%0A%0A%0A%0A%23include+%3Climits%3E%0A%23include+%3Cnumeric%3E%0A%23include+%3Cstdexcept%3E%0A%0Astatic_assert(std::numeric_limits%3Clong+long%3E::digits%0A++++++++++++++%3E%3D+2+*+std::numeric_limits%3Cint%3E::digits+%2B+1)%3B%0A%0Ainline+Rational+add_rationals(const+Rational%26+lhs,+const+Rational%26+rhs)+%7B%0A++++long+long+numerator+%3D+static_cast%3Clong+long%3E(lhs.numerator())+*+rhs.denominator()%0A++++++++++++++++++++++++%2B+static_cast%3Clong+long%3E(rhs.numerator())+*+lhs.denominator()%3B%0A++++long+long+denominator+%3D+static_cast%3Clong+long%3E(lhs.denominator())+*+rhs.denominator()%3B%0A++++const+auto+divisor+%3D+std::gcd(numerator,+denominator)%3B%0A++++numerator+/%3D+divisor%3B%0A++++denominator+/%3D+divisor%3B%0A++++if+(numerator+%3C+std::numeric_limits%3Cint%3E::min()%0A++++++++%7C%7C+numerator+%3E+std::numeric_limits%3Cint%3E::max()%0A++++++++%7C%7C+denominator+%3E+std::numeric_limits%3Cint%3E::max())+%7B%0A++++++++throw+std::overflow_error(%22sum+does+not+fit+in+Rational%22)%3B%0A++++%7D%0A++++return+Rational%7Bstatic_cast%3Cint%3E(numerator),+static_cast%3Cint%3E(denominator)%7D%3B%0A%7D%0A%0ARational%26+Rational::operator%2B%3D(const+Rational%26+rhs)+%7B%0A++++*this+%3D+add_rationals(*this,+rhs)%3B%0A++++return+*this%3B%0A%7D%0A%0A%0A%0ARational%26+Rational::operator%3D(const+Rational%26+other)+%7B%0A++++numerator_+%3D+other.numerator_%3B%0A++++denominator_+%3D+other.denominator_%3B%0A++++return+*this%3B%0A%7D%0A%0A%0A%23include+%3Costream%3E%0A%0Astd::ostream%26+operator%3C%3C(std::ostream%26+stream,+const+Rational%26+value)+%7B%0A++++stream+%3C%3C+value.numerator()+%3C%3C+!'/!'+%3C%3C+value.denominator()%3B%0A++++return+stream%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0+-Wall+-Wextra+-pedantic',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/09-operator-overloading/rational-addition-use.cpp" compiler="clang2310" options="-std=c++20 -O0 -Wall -Wextra -pedantic" extra-sources="../examples/09-operator-overloading/rational-add.cpp ../examples/09-operator-overloading/rational-add-assign.cpp ../examples/09-operator-overloading/rational-assignment.cpp ../examples/09-operator-overloading/rational-output.cpp" -->

[godbolt-09-default-order]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ccompare%3E%0A%23include+%3Ciostream%3E%0A%0Astruct+Fraction+%7B%0A++++int+numerator%3B%0A++++int+denominator%3B%0A++++auto+operator%3C%3D%3E(const+Fraction%26)+const+%3D+default%3B%0A%7D%3B%0A%0Aint+main()+%7B%0A++++Fraction+half%7B1,+2%7D,+third%7B1,+3%7D%3B%0A++++std::cout+%3C%3C+std::boolalpha+%3C%3C+(half+%3C+third)+%3C%3C+!'%5Cn!'%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0+-Wall+-Wextra+-pedantic',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/09-operator-overloading/default-order.cpp" compiler="clang2310" options="-std=c++20 -O0 -Wall -Wextra -pedantic" -->

[godbolt-09-explicit-error]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Climits%3E%0A%23include+%3Cnumeric%3E%0A%23include+%3Cstdexcept%3E%0Astatic_assert(std::numeric_limits%3Cint%3E::digits+%3C+std::numeric_limits%3Clong+long%3E::digits)%3B%0A%0Ainline+void+normalize_rational(int%26+numerator,+int%26+denominator)+%7B%0A++++if+(denominator+%3D%3D+0)+%7B%0A++++++++throw+std::invalid_argument(%22denominator+must+be+nonzero%22)%3B%0A++++%7D%0A++++long+long+n+%3D+numerator,+d+%3D+denominator%3B%0A++++const+auto+divisor+%3D+std::gcd(n,+d)%3B%0A++++n+/%3D+divisor%3B%0A++++d+/%3D+divisor%3B%0A++++if+(d+%3C+0)+%7B%0A++++++++n+%3D+-n%3B%0A++++++++d+%3D+-d%3B%0A++++%7D%0A++++if+(n+%3C+std::numeric_limits%3Cint%3E::min()+%7C%7C+n+%3E+std::numeric_limits%3Cint%3E::max()%0A++++++++%7C%7C+d+%3E+std::numeric_limits%3Cint%3E::max())+%7B%0A++++++++throw+std::overflow_error(%22normalized+rational+does+not+fit+in+int%22)%3B%0A++++%7D%0A++++numerator+%3D+static_cast%3Cint%3E(n)%3B%0A++++denominator+%3D+static_cast%3Cint%3E(d)%3B%0A%7D%0A%0Aclass+Rational+%7B%0Apublic:%0A++++explicit+Rational(int+numerator+%3D+0,+int+denominator+%3D+1)%0A++++++++:+numerator_(numerator),+denominator_(denominator)+%7B%0A++++++++normalize_rational(numerator_,+denominator_)%3B%0A++++%7D%0A++++Rational(const+Rational%26)+%3D+default%3B%0A++++Rational%26+operator%3D(const+Rational%26+other)%3B%0A++++Rational%26+operator%2B%3D(const+Rational%26+rhs)%3B%0A++++Rational%26+operator%2B%2B()%3B%0A++++Rational+operator%2B%2B(int)%3B%0A++++explicit+operator+float()+const+%7B%0A++++++++return+static_cast%3Cfloat%3E(numerator_)+/+denominator_%3B%0A++++%7D%0A%0A++++int+numerator()+const+%7B+return+numerator_%3B+%7D%0A++++int+denominator()+const+%7B+return+denominator_%3B+%7D%0A%0Aprivate:%0A++++int+numerator_%3B%0A++++int+denominator_%3B%0A%7D%3B%0A%23include+%3Ciostream%3E%0A%0Aint+main()+%7B%0A++++Rational+half%7B1,+2%7D%3B%0A++++float+value+%3D+half%3B%0A++++std::cout+%3C%3C+value+%3C%3C+!'%5Cn!'%3B%0A%7D%0A'),l:'5'),(h:compiler,i:(compiler:clang2310,filters:(binary:'1',binaryObject:'1',execute:'1'),j:1,lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0+-Wall+-Wextra+-pedantic',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/09-operator-overloading/implicit-float-error.cpp" compiler="clang2310" options="-std=c++20 -O0 -Wall -Wextra -pedantic" mode="compiler" -->

[godbolt-09-three-way-impl]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Climits%3E%0A%23include+%3Cnumeric%3E%0A%23include+%3Cstdexcept%3E%0Astatic_assert(std::numeric_limits%3Cint%3E::digits+%3C+std::numeric_limits%3Clong+long%3E::digits)%3B%0A%0Ainline+void+normalize_rational(int%26+numerator,+int%26+denominator)+%7B%0A++++if+(denominator+%3D%3D+0)+%7B%0A++++++++throw+std::invalid_argument(%22denominator+must+be+nonzero%22)%3B%0A++++%7D%0A++++long+long+n+%3D+numerator,+d+%3D+denominator%3B%0A++++const+auto+divisor+%3D+std::gcd(n,+d)%3B%0A++++n+/%3D+divisor%3B%0A++++d+/%3D+divisor%3B%0A++++if+(d+%3C+0)+%7B%0A++++++++n+%3D+-n%3B%0A++++++++d+%3D+-d%3B%0A++++%7D%0A++++if+(n+%3C+std::numeric_limits%3Cint%3E::min()+%7C%7C+n+%3E+std::numeric_limits%3Cint%3E::max()%0A++++++++%7C%7C+d+%3E+std::numeric_limits%3Cint%3E::max())+%7B%0A++++++++throw+std::overflow_error(%22normalized+rational+does+not+fit+in+int%22)%3B%0A++++%7D%0A++++numerator+%3D+static_cast%3Cint%3E(n)%3B%0A++++denominator+%3D+static_cast%3Cint%3E(d)%3B%0A%7D%0A%0Aclass+Rational+%7B%0Apublic:%0A++++explicit+Rational(int+numerator+%3D+0,+int+denominator+%3D+1)%0A++++++++:+numerator_(numerator),+denominator_(denominator)+%7B%0A++++++++normalize_rational(numerator_,+denominator_)%3B%0A++++%7D%0A++++Rational(const+Rational%26)+%3D+default%3B%0A++++Rational%26+operator%3D(const+Rational%26+other)%3B%0A++++Rational%26+operator%2B%3D(const+Rational%26+rhs)%3B%0A++++Rational%26+operator%2B%2B()%3B%0A++++Rational+operator%2B%2B(int)%3B%0A++++explicit+operator+float()+const+%7B%0A++++++++return+static_cast%3Cfloat%3E(numerator_)+/+denominator_%3B%0A++++%7D%0A%0A++++int+numerator()+const+%7B+return+numerator_%3B+%7D%0A++++int+denominator()+const+%7B+return+denominator_%3B+%7D%0A%0Aprivate:%0A++++int+numerator_%3B%0A++++int+denominator_%3B%0A%7D%3B%0A%23include+%3Ccompare%3E%0A%0Astd::strong_ordering+operator%3C%3D%3E(const+Rational%26+lhs,+const+Rational%26+rhs)%3B%0A%23include+%3Climits%3E%0A%0Astatic_assert(std::numeric_limits%3Clong+long%3E::digits%0A++++++++++++++%3E%3D+2+*+std::numeric_limits%3Cint%3E::digits)%3B%0A%0Astd::strong_ordering+operator%3C%3D%3E(const+Rational%26+lhs,%0A+++++++++++++++++++++++++++++++++const+Rational%26+rhs)+%7B%0A++++const+auto+left+%3D+static_cast%3Clong+long%3E(lhs.numerator())%0A++++++++++++++++++++*+rhs.denominator()%3B%0A++++const+auto+right+%3D+static_cast%3Clong+long%3E(rhs.numerator())%0A+++++++++++++++++++++*+lhs.denominator()%3B%0A++++return+left+%3C%3D%3E+right%3B%0A%7D%0A%0A%0A%23include+%3Ciostream%3E%0A%0Aint+main()+%7B%0A++++Rational+half%7B1,+2%7D,+third%7B1,+3%7D,+same%7B2,+4%7D%3B%0A++++std::cout+%3C%3C+std::boolalpha%0A++++++++++++++%3C%3C+((half+%3C%3D%3E+third)+%3E+0)+%3C%3C+!'%5Cn!'%0A++++++++++++++%3C%3C+((half+%3C%3D%3E+same)+%3D%3D+0)+%3C%3C+!'%5Cn!'%0A++++++++++++++%3C%3C+(third+%3C+half)+%3C%3C+!'%5Cn!'%0A++++++++++++++%3C%3C+(half+%3E%3D+same)+%3C%3C+!'%5Cn!'%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0+-Wall+-Wextra+-pedantic',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/09-operator-overloading/rational-three-way.cpp" compiler="clang2310" options="-std=c++20 -O0 -Wall -Wextra -pedantic" extra-sources="../examples/09-operator-overloading/rational-three-way-use.cpp" -->

[godbolt-09-three-way]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Climits%3E%0A%23include+%3Cnumeric%3E%0A%23include+%3Cstdexcept%3E%0Astatic_assert(std::numeric_limits%3Cint%3E::digits+%3C+std::numeric_limits%3Clong+long%3E::digits)%3B%0A%0Ainline+void+normalize_rational(int%26+numerator,+int%26+denominator)+%7B%0A++++if+(denominator+%3D%3D+0)+%7B%0A++++++++throw+std::invalid_argument(%22denominator+must+be+nonzero%22)%3B%0A++++%7D%0A++++long+long+n+%3D+numerator,+d+%3D+denominator%3B%0A++++const+auto+divisor+%3D+std::gcd(n,+d)%3B%0A++++n+/%3D+divisor%3B%0A++++d+/%3D+divisor%3B%0A++++if+(d+%3C+0)+%7B%0A++++++++n+%3D+-n%3B%0A++++++++d+%3D+-d%3B%0A++++%7D%0A++++if+(n+%3C+std::numeric_limits%3Cint%3E::min()+%7C%7C+n+%3E+std::numeric_limits%3Cint%3E::max()%0A++++++++%7C%7C+d+%3E+std::numeric_limits%3Cint%3E::max())+%7B%0A++++++++throw+std::overflow_error(%22normalized+rational+does+not+fit+in+int%22)%3B%0A++++%7D%0A++++numerator+%3D+static_cast%3Cint%3E(n)%3B%0A++++denominator+%3D+static_cast%3Cint%3E(d)%3B%0A%7D%0A%0Aclass+Rational+%7B%0Apublic:%0A++++explicit+Rational(int+numerator+%3D+0,+int+denominator+%3D+1)%0A++++++++:+numerator_(numerator),+denominator_(denominator)+%7B%0A++++++++normalize_rational(numerator_,+denominator_)%3B%0A++++%7D%0A++++Rational(const+Rational%26)+%3D+default%3B%0A++++Rational%26+operator%3D(const+Rational%26+other)%3B%0A++++Rational%26+operator%2B%3D(const+Rational%26+rhs)%3B%0A++++Rational%26+operator%2B%2B()%3B%0A++++Rational+operator%2B%2B(int)%3B%0A++++explicit+operator+float()+const+%7B%0A++++++++return+static_cast%3Cfloat%3E(numerator_)+/+denominator_%3B%0A++++%7D%0A%0A++++int+numerator()+const+%7B+return+numerator_%3B+%7D%0A++++int+denominator()+const+%7B+return+denominator_%3B+%7D%0A%0Aprivate:%0A++++int+numerator_%3B%0A++++int+denominator_%3B%0A%7D%3B%0A%23include+%3Ccompare%3E%0A%0Astd::strong_ordering+operator%3C%3D%3E(const+Rational%26+lhs,+const+Rational%26+rhs)%3B%0A%23include+%3Ciostream%3E%0A%0Aint+main()+%7B%0A++++Rational+half%7B1,+2%7D,+third%7B1,+3%7D,+same%7B2,+4%7D%3B%0A++++std::cout+%3C%3C+std::boolalpha%0A++++++++++++++%3C%3C+((half+%3C%3D%3E+third)+%3E+0)+%3C%3C+!'%5Cn!'%0A++++++++++++++%3C%3C+((half+%3C%3D%3E+same)+%3D%3D+0)+%3C%3C+!'%5Cn!'%0A++++++++++++++%3C%3C+(third+%3C+half)+%3C%3C+!'%5Cn!'%0A++++++++++++++%3C%3C+(half+%3E%3D+same)+%3C%3C+!'%5Cn!'%3B%0A%7D%0A%0A%0A%23include+%3Climits%3E%0A%0Astatic_assert(std::numeric_limits%3Clong+long%3E::digits%0A++++++++++++++%3E%3D+2+*+std::numeric_limits%3Cint%3E::digits)%3B%0A%0Astd::strong_ordering+operator%3C%3D%3E(const+Rational%26+lhs,%0A+++++++++++++++++++++++++++++++++const+Rational%26+rhs)+%7B%0A++++const+auto+left+%3D+static_cast%3Clong+long%3E(lhs.numerator())%0A++++++++++++++++++++*+rhs.denominator()%3B%0A++++const+auto+right+%3D+static_cast%3Clong+long%3E(rhs.numerator())%0A+++++++++++++++++++++*+lhs.denominator()%3B%0A++++return+left+%3C%3D%3E+right%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0+-Wall+-Wextra+-pedantic',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/09-operator-overloading/rational-three-way-use.cpp" compiler="clang2310" options="-std=c++20 -O0 -Wall -Wextra -pedantic" extra-sources="../examples/09-operator-overloading/rational-three-way.cpp" -->
