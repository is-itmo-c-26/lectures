#include <iostream>

int* Make() {
    int local = 42;
    return &local;  // Ошибка: возвращаем адрес локальной переменной.
}

int main() {
    int* pointer = Make();
    std::cout << *pointer << '\n';  // Неопределённое поведение. Не запускать.
}
