---
title: "IsTwiceSequence"
subtitle: "Весна 2026"
description: "Обобщённая проверка удвоенной подпоследовательности по однонаправленным итераторам."
page-navigation: false
---

[Все задания](index.md) · [Скачать все файлы (.zip)](../assets/livecoding/2026-spring.zip){download="2026-spring.zip"}

Разрешается пользоваться только cppreference, любые другие источники, включая ваш прошлый код, запрещены!

## Задача

Необходимо реализовать функцию `IsTwiceSequence`, которая в качестве обязательных аргументов принимает два итератора (корректный диапазон итераторов) на последовательность произвольного типа. Итератор отвечает требованиям однонаправленного итератора. В качестве результата возвращает `bool`.
`True` в случае если последовательность представляет из себя удвоенную подпоследовательность, `false` -  в противоположном.

Функция должна быть максимально обобщённой и учитывать всевозможные краевые случаи.

## Примеры

1. Для строки  `"abcdabcd"` -> `true`
2. Для строки  `"abcdabdc"` -> `false`
3. Для массива `{1,2,3,4,1,2,3,4}` -> `true`
4. Для вектора `{true, false, true}` -> `false`


## Ограничения

Запрещается использовать:

* стандартная библиотека кроме `<type_traits>`

## Исходные файлы

Файлы перенесены из репозитория без изменений. В исходном `CMakeLists.txt` выбран C++23.

`main.cpp` содержит пустую заготовку: решение задачи нужно реализовать самостоятельно.

### main.cpp

[Скачать main.cpp](../examples/livecoding/2026-spring/main.cpp){download="main.cpp"}

```{.cpp filename="main.cpp"}
{{< include ../examples/livecoding/2026-spring/main.cpp >}}
```

### CMakeLists.txt

[Скачать CMakeLists.txt](../examples/livecoding/2026-spring/CMakeLists.txt){download="CMakeLists.txt"}

```{.cmake filename="CMakeLists.txt"}
{{< include ../examples/livecoding/2026-spring/CMakeLists.txt >}}
```
