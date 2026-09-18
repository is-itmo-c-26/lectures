#include <cstddef>
#include <iostream>

void func(int*) {
    std::cout << "func(int*)\n";
}

void func(int) {
    std::cout << "func(int)\n";
}

int main() {
    func(nullptr);  // Выбирает func(int*).
    func(0);        // Выбирает func(int).
    func(NULL);     // Намеренная ошибка в Clang: неоднозначный вызов.
}
