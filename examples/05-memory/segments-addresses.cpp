#include <iostream>

const double kPi = 3.14159;
int counter = 239;
int total;

int Answer() {
    return 42;
}

int main() {
    int local = 0;
    const char* text = "Hello world";
    int* dynamic = new int{Answer()};

    std::cout << "text:   " << reinterpret_cast<void*>(&Answer) << '\n';
    std::cout << "rodata: " << &kPi << ' ' << static_cast<const void*>(text) << '\n';
    std::cout << "data:   " << &counter << '\n';
    std::cout << "bss:    " << &total << '\n';
    std::cout << "heap:   " << dynamic << '\n';
    std::cout << "stack:  " << &local << '\n';

    std::cin.get();  // пауза, чтобы посмотреть карту памяти
    delete dynamic;

    return 0;
}
