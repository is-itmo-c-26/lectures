#include <cstddef>
#include <iostream>

void Print(const char* text) {
    std::cout << "const char*: " << text << '\n';
}

void Print(int* number) {
    std::cout << "int*: " << *number << '\n';
}

void Print(std::nullptr_t) {
    std::cout << "std::nullptr_t\n";
}

int main() {
    int value = 42;
    Print(&value);
    Print("aa");
    Print(nullptr);

    return 0;
}
