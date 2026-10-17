#include <cstddef>
#include <iostream>

void print(const char*) { std::cout << "const char*\n"; }
void print(int*) { std::cout << "int*\n"; }
void print(std::nullptr_t) { std::cout << "nullptr\n"; }

int main() {
    print(nullptr); // Exact match: std::nullptr_t.
}
