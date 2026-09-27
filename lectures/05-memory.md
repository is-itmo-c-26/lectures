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
- Объекты ядра (файловые дескрипторы, объекты синхронизации и т.д. )
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


## Слайд 7

<!-- embedded-images:start -->
![Изображение 1 со слайда 7](../assets/05-memory/slide-07-image-01.png)
<!-- embedded-images:end -->


## Segments


- Stack
- Heap
- Memory Mapping
- BSS
- Data
- Text
- etc

## Segments


```cpp
int main() {
    int local = 0;
    const char* str = "Hello world";

    std::printf("Process id: %d\n", getpid());

    std::printf("Address of PI: %p\n", &PI);
    std::printf("Address of SomeGlobalValue %p\n", &SomeGlobalValue);
    std::printf("Address of str %p\n", str);
    std::printf("Address of SomeFunc %p\n", &SomeFunc);
    std::printf("Address of local %p\n", &local);

    getchar();
    return 0;
}
```

## Segments

<!-- embedded-images:start -->
![Изображение 1 со слайда 10](../assets/05-memory/slide-10-image-01.png)
<!-- embedded-images:end -->


## Stack (Стек вызова)


```cpp
int add(int a, int b) {
    return a + b;
}

int main() {
    int result;
    result = add(40, 2);
    return 0;
}
```

## Compiler Explorer (Godbolt)

<!-- embedded-images:start -->
![Изображение 1 со слайда 12](../assets/05-memory/slide-12-image-01.png)
<!-- embedded-images:end -->


## Стек вызова


- StackFrame
- arguments
- local variable
- return address
- cdecl, stdcall, fastcall
- Регистры процессора
- esp/rsp (верхушка стека)
- ebp/rbp (начало кадра)
- eax (результат)

## Источник

<!-- embedded-images:start -->
![Изображение 1 со слайда 14](../assets/05-memory/slide-14-image-01.png)
<!-- embedded-images:end -->


## Слайд 15

<!-- embedded-images:start -->
![Изображение 1 со слайда 15](../assets/05-memory/slide-15-image-01.png)
<!-- embedded-images:end -->


## Слайд 16

<!-- embedded-images:start -->
![Изображение 1 со слайда 16](../assets/05-memory/slide-16-image-01.png)
<!-- embedded-images:end -->


## Слайд 17

<!-- embedded-images:start -->
![Изображение 1 со слайда 17](../assets/05-memory/slide-17-image-01.png)
<!-- embedded-images:end -->


## Слайд 18

<!-- embedded-images:start -->
![Изображение 1 со слайда 18](../assets/05-memory/slide-18-image-01.png)
<!-- embedded-images:end -->


## Слайд 19

<!-- embedded-images:start -->
![Изображение 1 со слайда 19](../assets/05-memory/slide-19-image-01.png)
<!-- embedded-images:end -->


## Слайд 20

<!-- embedded-images:start -->
![Изображение 1 со слайда 20](../assets/05-memory/slide-20-image-01.png)
<!-- embedded-images:end -->


## Слайд 21

<!-- embedded-images:start -->
![Изображение 1 со слайда 21](../assets/05-memory/slide-21-image-01.png)
<!-- embedded-images:end -->


## Слайд 22

<!-- embedded-images:start -->
![Изображение 1 со слайда 22](../assets/05-memory/slide-22-image-01.png)
<!-- embedded-images:end -->


## Слайд 23

<!-- embedded-images:start -->
![Изображение 1 со слайда 23](../assets/05-memory/slide-23-image-01.png)
<!-- embedded-images:end -->


## Слайд 24

<!-- embedded-images:start -->
![Изображение 1 со слайда 24](../assets/05-memory/slide-24-image-01.png)
<!-- embedded-images:end -->


## Слайд 25

<!-- embedded-images:start -->
![Изображение 1 со слайда 25](../assets/05-memory/slide-25-image-01.png)
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


Фрагмент на C: в C++ результат `malloc` требует явного преобразования типа.

```c
int main() {
int* p1 = malloc(4 * sizeof(int));
int* p2 = malloc(sizeof(int[4]));

if (p1) {
    for (int n = 0; n < 4; ++n) p1[n] = n * n;
    for (int n = 0; n < 4; ++n) printf("p1[%d] == %d\n", n, p1[n]);
}
free(p1);
free(p2);
}
```

- malloc

## malloc


- malloc не гарантирует выделение памяти
- не забывать выставлять указатель в NULL после освобождения
- free(NULL) ничего не делает

## malloc


Пример на C: в C++ результаты `malloc` и `calloc` требуют явного преобразования типа.

```c
int main() {
    int i = 0;
    int* p = malloc(sizeof(int));
    int* arr = calloc(sizeof(int), 10);

    printf("Sizeof(i): %lu \t Address of i %p\n", sizeof(i), &i);
    printf("Sizeof(p): %lu \t Address of p %p\n", sizeof(p), &p);
    printf("Sizeof(*p): %lu \t Address of *p %p\n", sizeof(*p), p);
    printf("Sizeof(arr): %lu \t Address of arr %p\n", sizeof(arr), &arr);
    printf("Sizeof(*arr): %lu \t Address of *arr %p\n", sizeof(*arr), arr);

    free(p);
    free(arr);
}
```

## new\delete


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

## Segmentation fault


Опасный пример: большой локальный массив может переполнить стек. Не запускать как обычный пример.

```cpp
#include <stdint.h>
#include <stdio.h>

int main(int argc, char* argv[]) {
    uint64_t arr[1048570];  // 8Mb
    arr[10] = 1;
    return 0;
}
```

## Segmentation fault


Массив можно изменять. Закомментированный вариант с `char*` не компилируется в C++20; попытка изменить строковый литерал через указатель приводит к неопределённому поведению.

```cpp
int main(int argc, char* argv[]) {
    char local_str[] = "Hello world";
    // char* local_str = "Hello world";

    local_str[1] = 'E';
    printf("%s\n", local_str);

    return 0;
}
```

[godbolt-05-new-delete]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'int+main()+%7B%0A++++int*+value+%3D+new+int%3B%0A++++delete+value%3B%0A%0A++++int*+array+%3D+new+int%5B10%5D%3B%0A++++delete%5B%5D+array%3B%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="../examples/05-memory/new-delete.cpp" compiler="clang2310" options="-std=c++20 -O0" -->
