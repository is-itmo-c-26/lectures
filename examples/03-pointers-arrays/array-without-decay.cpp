#include <iostream>

int main() {
    int values[] = {10, 20, 30};
    int (&reference)[3] = values;  // Ссылка на весь массив.
    int (*whole)[3] = &values;    // Указатель на весь массив.
    decltype(values) copy = {40, 50, 60};  // Тип copy — int[3].

    std::cout << sizeof(values) / sizeof(values[0]) << '\n';  // 3
    std::cout << reference[1] << ' ' << (*whole)[1] << '\n';  // 20 20
    std::cout << copy[0] << '\n';  // 40
}
