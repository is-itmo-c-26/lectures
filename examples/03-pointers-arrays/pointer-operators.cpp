#include <iostream>

int main() {
    int x = 1;
    int y = 2;
    int* pointer = &x;  // Берём адрес x.
    y = *pointer;      // Читаем x: теперь y == 1.
    *pointer = 0;      // Изменяем x: теперь x == 0.

    std::cout << x << ' ' << y << '\n';  // 0 1
}
