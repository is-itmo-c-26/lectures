---
title: "Алгоритмы и генераторы"
subtitle: "Весна 2024"
description: "Шестнадцать вариантов: STL-совместимый алгоритм и генератор pythonrange или pythonzip."
page-navigation: false
---

[Все задания](index.md) · [Скачать все файлы (.zip)](../assets/livecoding/2024-spring.zip){download="2024-spring.zip"}

В рамках livecoding вам предстоит решить две задачи. Ваш вариант это - остаток от деления номера строки в таблице с баллами на 16.
Вам дается **1:20** на решение обеих задач.
Задача 1 реализуется в заголовочном файле *task_1.h*. Задача 2 - *task_2.h*.
*main.cpp* должен остаться неизменным, можете использовать его для локальной отладки.



| Вариант  | Задача 1   | Задача 2  |
|---|---|---|
| 0 | half_of         |  pythonrange |
| 1 | less_half_of    | pythonrange   |
| 2 | false_for       |  pythonrange |
| 3 | is_partitioned  | pythonrange  |
| 4 | find_not        | pythonrange  |
| 5 | find_backward   | pythonrange  |
| 6 | find_not_backward  | pythonrange  |
| 7 | is_palindrome    | pythonrange  |
| 8 | half_of         |  pythonzip |
| 9 | less_half_of    | pythonzip   |
| 10 | false_for       |  pythonzip |
| 11| is_partitioned  | pythonzip  |
| 12 | find_not        | pythonzip  |
| 13 | find_backward   | pythonzip  |
| 14 | find_not_backward  | pythonzip  |
| 15 | is_palindrome    | pythonzip  |


## Задача 1

Реализовать stl-совместимый алгоритм (один из, в соответствии с вариантом). Использование стандартной библиотеки запрещено

**half_of** - возвращает true, если как минимум половина элементов диапазона удовлетворяют некоторому предикату. Иначе false

**less_half_of** - возвращает true, если менее половины из элементов диапазона удовлетворяет некоторому предикату. Иначе false

**false_for** - возвращает true, если все элементы диапазона не удовлетворяют некоторому предикату. Иначе false

**is_partitioned**- возвращает true, если в диапазоне есть элемент, для которого все элементы до меньше, а после больше или равны ему. Иначе false.

**find_not** - находит первый элемент, не удовлетворяющий некоторому предикату

**find_backward** - находит первый элемент, равный заданному, с конца

**find_not_backward** - находит первый элемент, не равный заданному, с конца

**is_palindrome** - возвращает true, если заданная последовательность является палиндромом относительно некоторого условия. Иначе false.

## Задача 2

Реализовать функцию - генератор.

### pythonrange

Функция генерирует значения для произвольного типа из определенного диапазона с некоторым шагом за O(1) по памяти

Должно быть реализованы две сигнатуры:

- pythonrange(start, end)
- pythonrange(start, end, step)

Аргументы одного типа.

Принцип работы указан в следующих примерах

```cpp
auto x = pythonrange(1.5, 5.5);
std::vector<double> v{x.begin(), x.end()}; // 1.5 2.5 3.5 4.5
```

```cpp
// 1 3 5
for(auto i : pythonrange(1, 6, 2)) {
    std::cout << i <<  " ";
}
```

```cpp
// a aa aaa
std::string start = "";
std::string end = "aaaa";
std::string step = "a";
for(auto i : pythonrange(start, end, step)) {
    std::cout << i <<  " ";
}
```

```cpp
class T {
public:
    T(int data) : data_(data) {}

    T& operator++() {
        ++data_;
        return *this;
    }

    bool operator==(const T& other) const {
        return data_ == other.data_;
    }

    int GetData() const {
        return data_;
    }

private:
    int data_;
};

// 0 1 2
for(auto t : pythonrange(T(0), T(3))) {
    std::cout << t.GetData() <<  " ";
}
```

Без указания шага, на каждой итерации генерируется инкремент к предыдущему значению, при трех параметрах - увеличивается на указанный шаг.

### pythonzip

pythonzip  принимает две последовательности и  генерирует пары, где i-я пара состоит из i-го числа первой и второй последовательности за O(1) по памяти. Если одна последовательность короче второй, то после достижения последнего элемента более короткой последовательности генерация заканчивается, Функция должна поддерживать работу с любым контейнерами поддерживающими однонаправленные итераторы.

Гарантируется, что аргументы - stl совместимые контейнеры, обладающие как минимум входным итератором

Пример:

```cpp
std::list l = {1, 2, 3, 4, 5};
std::vector v = {'a', 'b', 'c', 'd'};
/*
1 a
2 b
3 c
4 d
*/
for(auto value : pythonzip(l, v)) {
  std::cout << value.first << " " << value.second << std::endl;
}
```

## Исходные файлы

Файлы перенесены из репозитория без изменений. В исходном `CMakeLists.txt` выбран C++23.

`task_1.h` и `task_2.h` содержат только комментарии: алгоритм и генератор нужно реализовать. Пустой `main.cpp` предназначен для локальной отладки.

### main.cpp

[Скачать main.cpp](../examples/livecoding/2024-spring/main.cpp){download="main.cpp"}

```{.cpp filename="main.cpp"}
{{< include ../examples/livecoding/2024-spring/main.cpp >}}
```

### task_1.h

[Скачать task_1.h](../examples/livecoding/2024-spring/task_1.h){download="task_1.h"}

```{.cpp filename="task_1.h"}
{{< include ../examples/livecoding/2024-spring/task_1.h >}}
```

### task_2.h

[Скачать task_2.h](../examples/livecoding/2024-spring/task_2.h){download="task_2.h"}

```{.cpp filename="task_2.h"}
{{< include ../examples/livecoding/2024-spring/task_2.h >}}
```

### CMakeLists.txt

[Скачать CMakeLists.txt](../examples/livecoding/2024-spring/CMakeLists.txt){download="CMakeLists.txt"}

```{.cmake filename="CMakeLists.txt"}
{{< include ../examples/livecoding/2024-spring/CMakeLists.txt >}}
```
