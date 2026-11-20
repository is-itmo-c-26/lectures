#include <cstddef>
#include <iostream>

void Func(int*) {
    std::cout << "Func(int*)\n";
}

void Func(int) {
    std::cout << "Func(int)\n";
}

int main() {
    Func(nullptr);  // Выбирает Func(int*).
    Func(0);        // Выбирает Func(int).
    Func(NULL);     // Намеренная ошибка в Clang: неоднозначный вызов.
}
