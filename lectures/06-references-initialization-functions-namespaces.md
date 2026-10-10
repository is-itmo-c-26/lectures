---
title: "Лекция 6. Ссылки, инициализация, функции и пространства имён"
---

::: {.content-visible unless-format="revealjs"}

[Открыть слайды](../slides/lectures/06-references-initialization-functions-namespaces.html){.btn .btn-outline-primary target="_blank"}

:::

## План лекции

- Ссылки и время жизни объектов
- Выбор способа передачи аргументов
- Перегрузка функций, `nullptr` и аргументы по умолчанию
- Инициализация: начальное значение и фигурные скобки
- Пространства имён

## Обмен значениями через указатели

```{.cpp filename="swap-pointers.cpp"}
{{< include ../examples/06-references-initialization-functions-namespaces/swap-pointers.cpp >}}
```

Чтобы изменить исходные переменные, передаём их адреса.

## Указатель может быть нулевым

Опасный пример: компилируется, но разыменование `nullptr` приводит к **неопределённому поведению**. Не запускать.

```{.cpp filename="swap-null-pointer.cpp"}
{{< include ../examples/06-references-initialization-functions-namespaces/swap-null-pointer.cpp >}}
```

Для обмена нужны два существующих объекта. Молчаливый `return` при `nullptr` скрыл бы нарушение этого условия.

## Ссылка — другое имя объекта

Lvalue-ссылка `T&` связывается с существующим объектом.

```{.cpp filename="reference-alias.cpp"}
{{< include ../examples/06-references-initialization-functions-namespaces/reference-alias.cpp >}}
```

`int& alias;` без инициализатора — ошибка. `&alias` даёт адрес исходного объекта.

## Ссылку нельзя перепривязать

```{.cpp filename="reference-assignment.cpp"}
{{< include ../examples/06-references-initialization-functions-namespaces/reference-assignment.cpp >}}
```

Присваивание через ссылку меняет объект, а не связь с ним.

## Чтение через const-ссылку

```{.cpp filename="const-reference.cpp"}
{{< include ../examples/06-references-initialization-functions-namespaces/const-reference.cpp >}}
```

`const T&` запрещает изменение **через эту ссылку**. Сам объект может оставаться изменяемым.

## Обмен значениями через ссылки

```{.cpp filename="swap-references.cpp"}
{{< include ../examples/06-references-initialization-functions-namespaces/swap-references.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-06-swap-references]{aria-label="Open in Compiler Explorer"}

Вызов передаёт сами переменные. У ссылки нет корректного «нулевого» состояния; объект должен оставаться живым.

## Копия или исходный объект?

```{.cpp filename="value-and-reference.cpp"}
{{< include ../examples/06-references-initialization-functions-namespaces/value-and-reference.cpp >}}
```

## Как передавать аргумент?

| Параметр | Смысл | Типичный случай |
|---|---|---|
| `T value` | Отдельный объект-параметр | Небольшое значение: `int`, `double` |
| `const T& value` | Чтение исходного объекта без копии | Большая структура или строка |
| `T& value` | Изменение исходного объекта | Обязательный выходной параметр |
| `const T* value` | Чтение через указатель | Объект может отсутствовать |
| `T* value` | Изменение через указатель | Объект может отсутствовать |

Допустимость `nullptr` определяет договорённость функции. Указатель также может обозначать начало массива.

## Когда отсутствие объекта допустимо

```{.cpp filename="optional-pointer.cpp"}
{{< include ../examples/06-references-initialization-functions-namespaces/optional-pointer.cpp >}}
```

Здесь `nullptr` имеет осмысленное значение, которое функция явно обрабатывает.

## Ссылка не владеет объектом

Опасный пример: возвращается ссылка на уничтоженный локальный объект. Чтение через неё — **неопределённое поведение**. Не запускать.

```{.cpp filename="dangling-reference.cpp"}
{{< include ../examples/06-references-initialization-functions-namespaces/dangling-reference.cpp >}}
```

Диагностика компилятора не заменяет контроль времени жизни. Нельзя рассчитывать на конкретное значение или падение программы.

## Локальный результат возвращаем по значению

```{.cpp filename="return-value.cpp"}
{{< include ../examples/06-references-initialization-functions-namespaces/return-value.cpp >}}
```

Результат функции — отдельное значение. После выхода из функции локальная переменная больше не нужна.

## Временный объект и const-ссылка

```{.cpp filename="reference-lifetime.cpp"}
{{< include ../examples/06-references-initialization-functions-namespaces/reference-lifetime.cpp >}}
```

При такой непосредственной привязке время жизни временного объекта продлевается до времени жизни ссылки. Это не спасает ссылку на локальную переменную, возвращённую из функции.

## Перегрузка: одно имя, разные параметры

```{.cpp filename="function-overload.cpp"}
{{< include ../examples/06-references-initialization-functions-namespaces/function-overload.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-06-function-overload]{aria-label="Open in Compiler Explorer"}

Компилятор выбирает перегрузку по аргументам. Здесь оба вызова имеют точное совпадение типов.

## Если точного совпадения нет

```{.cpp filename="overload-conversion.cpp"}
{{< include ../examples/06-references-initialization-functions-namespaces/overload-conversion.cpp >}}
```

Допустимые преобразования тоже участвуют в выборе. В этом примере дробная часть теряется.

## Неоднозначная перегрузка

Пример намеренно не компилируется.

```{.cpp filename="overload-ambiguous.cpp"}
{{< include ../examples/06-references-initialization-functions-namespaces/overload-ambiguous.cpp >}}
```

`20.1` имеет тип `double`. Ни одно из двух преобразований не лучше другого. Для выбора `float` можно написать `20.1f`, для `int` — `20`.

## Возвращаемый тип не различает перегрузки

Пример намеренно не компилируется: список параметров одинаковый.

```{.cpp filename="overload-return-type.cpp"}
{{< include ../examples/06-references-initialization-functions-namespaces/overload-return-type.cpp >}}
```

Тип переменной, в которую мы хотим записать результат, не исправит конфликт объявлений.

## nullptr вместо числового нуля

```{.cpp filename="nullptr-overload.cpp"}
{{< include ../examples/06-references-initialization-functions-namespaces/nullptr-overload.cpp >}}
```

`nullptr` обозначает нулевой указатель. `NULL` — макрос с зависящим от реализации определением: вызов с ним может выбрать `int` или оказаться неоднозначным.

## nullptr не выбирает тип указателя

Пример намеренно не компилируется: обе указательные перегрузки подходят.

```{.cpp filename="nullptr-ambiguous.cpp"}
{{< include ../examples/06-references-initialization-functions-namespaces/nullptr-ambiguous.cpp >}}
```

Нулевой указатель конкретного типа, например переменная `int*`, выбрал бы соответствующую перегрузку.

## У nullptr есть собственный тип

```{.cpp filename="nullptr-type.cpp"}
{{< include ../examples/06-references-initialization-functions-namespaces/nullptr-type.cpp >}}
```

`std::nullptr_t` объявлен в `<cstddef>`. Отдельная перегрузка полезна, если отсутствие объекта требует особого поведения.

## Аргументы по умолчанию

```{.cpp filename="default-argument.cpp"}
{{< include ../examples/06-references-initialization-functions-namespaces/default-argument.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-06-default-argument]{aria-label="Open in Compiler Explorer"}

Пропущенные аргументы подставляются справа. Нельзя пропустить первый аргумент, передав только второй.

## Где указывать значение по умолчанию

- Значение должно быть видно в объявлении в месте вызова.
- Если объявление и определение разделены, значение обычно указывают в объявлении; повторять его в определении нельзя.
- В обычном списке параметров после параметра со значением по умолчанию остальные тоже должны иметь значения по умолчанию.
- Значения по умолчанию не создают новые перегрузки: сочетание `f(int)` и `f(int, int = 0)` делает вызов `f(1)` неоднозначным.

## Инициализация и присваивание

```{.cpp filename="initialization-and-assignment.cpp"}
{{< include ../examples/06-references-initialization-functions-namespaces/initialization-and-assignment.cpp >}}
```

## Есть ли начальное значение?

```{.cpp filename="default-and-value-initialization.cpp"}
{{< include ../examples/06-references-initialization-functions-namespaces/default-and-value-initialization.cpp >}}
```

Для локального `int` запись без инициализатора не задаёт значение. Чтение такого значения в C++20 — неопределённое поведение. У глобальных и `static` переменных действуют дополнительные правила нулевой инициализации.

## Несколько форм инициализации

```{.cpp filename="initialization-forms.cpp"}
{{< include ../examples/06-references-initialization-functions-namespaces/initialization-forms.cpp >}}
```

Это не набор непересекающихся категорий: пустой список `{}` для `int` приводит к value-initialization. Запись `int value();` объявляет функцию, а не переменную.

## Фигурные скобки запрещают сужение

Пример намеренно не компилируется.

```{.cpp filename="narrowing-initialization.cpp"}
{{< include ../examples/06-references-initialization-functions-namespaces/narrowing-initialization.cpp >}}
```

Если потеря дробной части задумана, выразите её явно: `static_cast<int>(source)`.

## Инициализация агрегата

```{.cpp filename="aggregate-initialization.cpp"}
{{< include ../examples/06-references-initialization-functions-namespaces/aggregate-initialization.cpp >}}
```

Значения задаются в порядке объявления полей. Вложенные скобки инициализируют вложенный `Point`.

## Что выбирать на этом этапе?

- Задавайте начальное значение до первого чтения.
- Для чисел `{}` удобно, когда нужна проверка сужения; пустые скобки дают ноль.
- Для простых структур используйте список значений полей.
- Для классов `()` и `{}` могут выбирать разные конструкторы — это разберём вместе с классами.

Подробности: [инициализация в C++](https://en.cppreference.com/w/cpp/language/initialization).

## Пространства имён предотвращают конфликты

```{.cpp filename="namespace-qualified.cpp"}
{{< include ../examples/06-references-initialization-functions-namespaces/namespace-qualified.cpp >}}
```

Квалифицированное имя `screen::print` явно указывает, какую функцию вызвать.

## using: одно имя или всё пространство?

```{.cpp filename="namespace-using.cpp"}
{{< include ../examples/06-references-initialization-functions-namespaces/namespace-using.cpp >}}
```

`using screen::print;` вводит конкретное имя. Директива `using namespace screen;` позволяет искать неквалифицированные имена во всём пространстве. Здесь область действия — блок `main`.

## Директивы using могут создать неоднозначность

Пример намеренно не компилируется.

```{.cpp filename="namespace-ambiguous.cpp"}
{{< include ../examples/06-references-initialization-functions-namespaces/namespace-ambiguous.cpp >}}
```

Исправление: `screen::print()` или `file::print()`. Не размещайте `using namespace` в глобальной области заголовка: это влияет на включающий его код.

## Вложенность, продолжение и псевдоним

```{.cpp filename="namespace-alias.cpp"}
{{< include ../examples/06-references-initialization-functions-namespaces/namespace-alias.cpp >}}
```

Пространство имён можно открывать повторно. Запись `namespace course::graphics` доступна с C++17; псевдоним `gfx` сокращает длинное имя.

## Безымянное пространство имён

```{.cpp filename="unnamed-namespace.cpp"}
{{< include ../examples/06-references-initialization-functions-namespaces/unnamed-namespace.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-06-unnamed-namespace]{aria-label="Open in Compiler Explorer"}

`counter` — деталь реализации этой единицы трансляции. В другом `.cpp` одноимённый счётчик в безымянном пространстве будет отдельным объектом.

## Где применять безымянное пространство?

- В `.cpp`: для вспомогательных функций и переменных, которые не должны предоставляться другим единицам трансляции.
- Единица трансляции — исходный файл после обработки `#include` и остальных директив препроцессора.
- Это не запрет доступа из `main` в том же файле и не механизм защиты данных.
- В заголовке такие объявления создадут отдельные сущности в каждой включающей его единице трансляции; обычно это не то, что нужно для общего состояния.

## Проверьте себя

1. Чем `int&` отличается от `const int&`?
2. Почему `alias = other` не перепривязывает ссылку?
3. Когда параметр-указатель удобнее ссылки?
4. Почему нельзя вернуть ссылку на локальную переменную?
5. Чем отличаются локальные `int x;` и `int x{};`?
6. Зачем помещать вспомогательную функцию в безымянное пространство имён?

[godbolt-06-swap-references]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%0Avoid+swap_values(int%26+left,+int%26+right)+%7B%0A++++int+temporary+%3D+left%3B%0A++++left+%3D+right%3B%0A++++right+%3D+temporary%3B%0A%7D%0A%0Aint+main()+%7B%0A++++int+first+%3D+10%3B%0A++++int+second+%3D+20%3B%0A++++swap_values(first,+second)%3B%0A++++std::cout+%3C%3C+first+%3C%3C+!'+!'+%3C%3C+second+%3C%3C+!'%5Cn!'%3B+//+20+10%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/06-references-initialization-functions-namespaces/swap-references.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-06-function-overload]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%0Avoid+print(int+value)+%7B%0A++++std::cout+%3C%3C+%22int:+%22+%3C%3C+value+%3C%3C+!'%5Cn!'%3B%0A%7D%0Avoid+print(double+value)+%7B%0A++++std::cout+%3C%3C+%22double:+%22+%3C%3C+value+%3C%3C+!'%5Cn!'%3B%0A%7D%0A%0Aint+main()+%7B%0A++++print(20)%3B+++//+int%0A++++print(20.1)%3B+//+double%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/06-references-initialization-functions-namespaces/function-overload.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-06-default-argument]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%0Avoid+print_pair(int+first,+int+second+%3D+0)+%7B%0A++++std::cout+%3C%3C+first+%3C%3C+!'+!'+%3C%3C+second+%3C%3C+!'%5Cn!'%3B%0A%7D%0A%0Aint+main()+%7B%0A++++print_pair(10)%3B+++++//+10+0%0A++++print_pair(10,+20)%3B+//+10+20%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/06-references-initialization-functions-namespaces/default-argument.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-06-unnamed-namespace]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%0Anamespace+%7B%0A++++int+counter+%3D+0%3B%0A%7D%0A%0Avoid+increment()+%7B%0A++++%2B%2Bcounter%3B%0A%7D%0A%0Aint+main()+%7B%0A++++increment()%3B%0A++++std::cout+%3C%3C+counter+%3C%3C+!'%5Cn!'%3B+//+1%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/06-references-initialization-functions-namespaces/unnamed-namespace.cpp" compiler="clang2310" options="-std=c++20 -O0" -->
