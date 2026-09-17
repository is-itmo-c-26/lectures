#include <iostream>

int main() {
    int value = 10;
    int* pointer = &value;

    std::cout << "Адрес value: " << &value << '\n';
    std::cout << "Значение pointer: " << pointer << '\n';
    std::cout << "Адрес pointer: " << &pointer << '\n';

    return 0;
}
