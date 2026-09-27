---
title: "Лекция 5. Работа с памятью"
---

::: {.content-visible unless-format="revealjs"}

[Открыть слайды](../slides/lectures/05-memory.html){.btn .btn-outline-primary target="_blank"}

:::

## План лекции

- Процессы, потоки и виртуальное адресное пространство
- Сегменты программы и представление данных в памяти
- Стек вызовов и время жизни локальных объектов
- Куча, `malloc`/`free` и `new`/`delete`
- Ошибки доступа к памяти и segmentation fault

## Работа программ

- Архитектуры фон Неймана и Гарвардская
- Виды памяти
- Процессор
- Прерывания

## Процессы и потоки

- Процессы
  - Независимое адресное пространство
  - Объекты ядра: файловые дескрипторы, объекты синхронизации и т. д.
- Потоки
  - Набор команд
  - Стек

## Виртуальное адресное пространство

- У каждого процесса “своя” память
- Иллюзия доступности всех ресурсов
- Выполняется маппинг на физическую память
- Page Table
- Segments
- ОС также реализует данную логику

## Page table

<!-- embedded-images:start -->
![Изображение 1 со слайда 5](../assets/05-memory/slide-05-image-01.png)
<!-- embedded-images:end -->

- Маппинг виртуального адреса на физический
- Изоляция процессов
- Memory-mapped file
- Обеспечение безопасного режима работы ОС
- swapping

## Представление программы в памяти

<!-- embedded-images:start -->
![Изображение 1 со слайда 6](../assets/05-memory/slide-06-image-01.png)
<!-- embedded-images:end -->

## Адресное пространство процесса Linux: 32-битная схема

<!-- embedded-images:start -->
![Адресное пространство процесса Linux: 32-битная схема](../assets/05-memory/slide-07-image-01.png)
<!-- embedded-images:end -->

## Сегменты памяти

- Stack
- Heap
- Memory Mapping
- BSS
- Data
- Text
- etc

## Адреса объектов и функции

Пример для Linux/macOS: `getpid` и преобразование указателя на функцию в `void*` опираются на POSIX. Программа ждёт Enter, чтобы можно было изучить память процесса.

```{.cpp filename="memory-addresses.cpp"}
{{< include ../examples/05-memory/memory-addresses.cpp >}}
```

## Карта памяти запущенного процесса

<!-- embedded-images:start -->
![Изображение 1 со слайда 10](../assets/05-memory/slide-10-image-01.png)
<!-- embedded-images:end -->

## Стек вызовов: передача аргументов и результат

```{.cpp filename="function-call.cpp"}
{{< include ../examples/05-memory/function-call.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-05-function-call]{aria-label="Open in Compiler Explorer"}

## [Compiler Explorer (Godbolt)](https://godbolt.org/)

<!-- embedded-images:start -->
![Изображение 1 со слайда 12](../assets/05-memory/slide-12-image-01.png)
<!-- embedded-images:end -->

## Стек вызова

- Кадр стека (stack frame)
  - Аргументы
  - Локальные переменные
  - Адрес возврата
- Соглашения о вызовах: cdecl, stdcall, fastcall
- Регистры процессора на схемах x86
  - `esp` — вершина стека
  - `ebp` — начало кадра
  - `eax` — возвращаемое целое значение

## Устройство кадра стека

[Источник: Journey to the Stack](https://manybutfinite.com/post/journey-to-the-stack/)

Схемы показывают 32-битный x86 с указателем кадра. На другой архитектуре и при оптимизации размещение аргументов и работа со стеком могут отличаться.

<!-- embedded-images:start -->
![Изображение 1 со слайда 14](../assets/05-memory/slide-14-image-01.png)
<!-- embedded-images:end -->

## Вызов main: адрес возврата

<!-- embedded-images:start -->
![Вызов main: адрес возврата](../assets/05-memory/slide-15-image-01.png)
<!-- embedded-images:end -->

## Пролог main: сохранение ebp

<!-- embedded-images:start -->
![Пролог main: сохранение ebp](../assets/05-memory/slide-16-image-01.png)
<!-- embedded-images:end -->

## Пролог main: установка указателя кадра

<!-- embedded-images:start -->
![Пролог main: установка указателя кадра](../assets/05-memory/slide-17-image-01.png)
<!-- embedded-images:end -->

## Выделение места для локальных данных main

<!-- embedded-images:start -->
![Выделение места для локальных данных main](../assets/05-memory/slide-18-image-01.png)
<!-- embedded-images:end -->

## Подготовка аргументов: 40 и 2

<!-- embedded-images:start -->
![Подготовка аргументов: 40 и 2](../assets/05-memory/slide-19-image-01.png)
<!-- embedded-images:end -->

## Вызов add: адрес возврата в main

<!-- embedded-images:start -->
![Вызов add: адрес возврата в main](../assets/05-memory/slide-20-image-01.png)
<!-- embedded-images:end -->

## Пролог add: сохранение кадра main

<!-- embedded-images:start -->
![Пролог add: сохранение кадра main](../assets/05-memory/slide-21-image-01.png)
<!-- embedded-images:end -->

## Пролог add: установка нового кадра

<!-- embedded-images:start -->
![Пролог add: установка нового кадра](../assets/05-memory/slide-22-image-01.png)
<!-- embedded-images:end -->

## Место для локальной переменной result

<!-- embedded-images:start -->
![Место для локальной переменной result](../assets/05-memory/slide-23-image-01.png)
<!-- embedded-images:end -->

## Вычисление суммы в eax

<!-- embedded-images:start -->
![Вычисление суммы в eax](../assets/05-memory/slide-24-image-01.png)
<!-- embedded-images:end -->

## Сохранение результата в локальную переменную

<!-- embedded-images:start -->
![Сохранение результата в локальную переменную](../assets/05-memory/slide-25-image-01.png)
<!-- embedded-images:end -->

## Heap (Куча)

- В отличие от стека позволяет создавать динамические структуры большого размера
- Управление жизнью объектов в куче “ручное”

## Функции работы с памятью из `<cstdlib>`

- malloc
- free
- calloc
- realloc

## malloc: выделение и освобождение

```{.cpp filename="malloc-array.cpp"}
{{< include ../examples/05-memory/malloc-array.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-05-malloc-array]{aria-label="Open in Compiler Explorer"}

В C++ результат `malloc` преобразуем из `void*` в `int*`. Перед чтением элементов записываем в них значения.

## Проверка выделения и освобождение памяти

- Если выделение не удалось, `malloc` возвращает `nullptr`.
- Память освобождаем через `std::free` ровно один раз.
- `std::free(nullptr)` ничего не делает.
- После освобождения указатель нельзя разыменовывать. Присваивание `nullptr` одной переменной не исправляет другие копии указателя.

## calloc: массив с нулевыми значениями

```{.cpp filename="calloc-array.cpp"}
{{< include ../examples/05-memory/calloc-array.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-05-calloc-array]{aria-label="Open in Compiler Explorer"}

`calloc` получает количество элементов и размер одного элемента, затем обнуляет выделенные байты. Для массива `int` это даёт нулевые значения.

## Указатель и объект: разные адреса и размеры

```{.cpp filename="pointer-and-object.cpp"}
{{< include ../examples/05-memory/pointer-and-object.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-05-pointer-and-object]{aria-label="Open in Compiler Explorer"}

`&pointer` — адрес переменной-указателя; `pointer` — адрес выделенного объекта. `sizeof(pointer)` измеряет указатель, а `sizeof(*pointer)` — объект типа `int`.

## new и delete

```{.cpp filename="new-delete.cpp"}
{{< include ../examples/05-memory/new-delete.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-05-new-delete]{aria-label="Open in Compiler Explorer"}

## Segmentation fault

- Обращение к несуществующему адресу
- Обращение к сегменту без необходимых прав доступа
- Попытка изменить данные в сегменте только для чтения
- Обращения по нулевому указателю
- Обращение через указатель на уже освобождённую память
- Переполнение стека
- Переполнение буфера

## Большой локальный массив: риск переполнения стека

**Опасный пример — не запускать как обычный пример.** Массив занимает 8 МиБ; результат зависит от лимита стека потока. `volatile` сохраняет обращения к массиву при оптимизации, но не гарантирует конкретный размер кадра или падение.

```{.cpp filename="large-stack-array.cpp"}
{{< include ../examples/05-memory/large-stack-array.cpp >}}
```

## Изменяемый массив и строковый литерал

```{.cpp filename="mutable-string.cpp"}
{{< include ../examples/05-memory/mutable-string.cpp >}}
```

[![](../assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-05-mutable-string]{aria-label="Open in Compiler Explorer"}

Массив `text` можно изменять. Закомментированная запись через `literal` не компилируется. Попытка обойти `const` и изменить строковый литерал приводит к неопределённому поведению.

[godbolt-05-new-delete]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'int+main()+%7B%0A++++int*+value+%3D+new+int%3B%0A++++delete+value%3B%0A%0A++++int*+array+%3D+new+int%5B10%5D%3B%0A++++delete%5B%5D+array%3B%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/05-memory/new-delete.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-05-function-call]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%0Aint+add(int+a,+int+b)+%7B%0A++++int+result+%3D+a+%2B+b%3B%0A++++return+result%3B%0A%7D%0A%0Aint+main()+%7B%0A++++int+a+%3D+40%3B%0A++++int+b+%3D+2%3B%0A++++int+answer+%3D+add(a,+b)%3B%0A++++std::cout+%3C%3C+answer+%3C%3C+!'%5Cn!'%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/05-memory/function-call.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-05-malloc-array]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ccstdio%3E%0A%23include+%3Ccstdlib%3E%0A%0Aint+main()+%7B%0A++++int*+values+%3D+static_cast%3Cint*%3E(std::malloc(4+*+sizeof(int)))%3B%0A++++if+(values+%3D%3D+nullptr)+%7B%0A++++++++return+1%3B%0A++++%7D%0A%0A++++for+(int+index+%3D+0%3B+index+%3C+4%3B+%2B%2Bindex)+%7B%0A++++++++values%5Bindex%5D+%3D+index+*+index%3B%0A++++++++std::printf(%22values%5B%25d%5D+%3D+%25d%5Cn%22,+index,+values%5Bindex%5D)%3B%0A++++%7D%0A++++std::free(values)%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/05-memory/malloc-array.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-05-calloc-array]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ccstdio%3E%0A%23include+%3Ccstdlib%3E%0A%0Aint+main()+%7B%0A++++int*+values+%3D+static_cast%3Cint*%3E(std::calloc(4,+sizeof(int)))%3B%0A++++if+(values+%3D%3D+nullptr)+%7B%0A++++++++return+1%3B%0A++++%7D%0A%0A++++for+(int+index+%3D+0%3B+index+%3C+4%3B+%2B%2Bindex)+%7B%0A++++++++std::printf(%22values%5B%25d%5D+%3D+%25d%5Cn%22,+index,+values%5Bindex%5D)%3B%0A++++%7D%0A++++std::free(values)%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/05-memory/calloc-array.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-05-pointer-and-object]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ccstdio%3E%0A%23include+%3Ccstdlib%3E%0A%0Aint+main()+%7B%0A++++int+local+%3D+0%3B%0A++++int*+pointer+%3D+static_cast%3Cint*%3E(std::malloc(sizeof(int)))%3B%0A++++if+(pointer+%3D%3D+nullptr)+%7B%0A++++++++return+1%3B%0A++++%7D%0A++++*pointer+%3D+42%3B%0A%0A++++std::printf(%22local:+size%3D%25zu,+address%3D%25p%5Cn%22,+sizeof(local),+static_cast%3Cvoid*%3E(%26local))%3B%0A++++std::printf(%22pointer:+size%3D%25zu,+address%3D%25p%5Cn%22,+sizeof(pointer),+static_cast%3Cvoid*%3E(%26pointer))%3B%0A++++std::printf(%22*pointer:+size%3D%25zu,+address%3D%25p%5Cn%22,+sizeof(*pointer),+static_cast%3Cvoid*%3E(pointer))%3B%0A++++std::printf(%22value%3D%25d%5Cn%22,+*pointer)%3B%0A++++std::free(pointer)%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/05-memory/pointer-and-object.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

[godbolt-05-mutable-string]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ccstdio%3E%0A%0Aint+main()+%7B%0A++++char+text%5B%5D+%3D+%22Hello+world%22%3B%0A++++text%5B1%5D+%3D+!'E!'%3B%0A++++std::puts(text)%3B%0A%0A++++const+char*+literal+%3D+%22Hello+world%22%3B%0A++++//+literal%5B1%5D+%3D+!'E!'%3B+//+Compilation+error:+the+character+is+const.%0A++++std::puts(literal)%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/05-memory/mutable-string.cpp" compiler="clang2310" options="-std=c++20 -O0" -->
