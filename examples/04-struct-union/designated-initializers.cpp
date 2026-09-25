#include <iostream>

struct Point {
    int x;
    int y;
};

int main() {
    Point first{};                 // x == 0, y == 0.
    Point second{200, 300};         // Значения по порядку полей.
    Point third{.x = 10, .y = 20}; // Имена полей, C++20.
    Point fourth;                  // Поля не инициализированы.
    fourth = {30, 40};             // Задаём значения перед чтением.

    // Ошибки в стандартном C++20:
    // Point reversed{.y = 20, .x = 10};
    // Point mixed{10, .y = 20};

    std::cout << first.x << ' ' << first.y << '\n';
    std::cout << second.x << ' ' << second.y << '\n';
    std::cout << third.x << ' ' << third.y << '\n';
    std::cout << fourth.x << ' ' << fourth.y << '\n';
}
