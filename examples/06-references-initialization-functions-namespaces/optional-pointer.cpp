#include <iostream>

void print_value(const int* value) {
    if (value == nullptr) {
        std::cout << "No value\n";
        return;
    }
    std::cout << *value << '\n';
}

int main() {
    int value = 42;
    print_value(&value); // 42
    print_value(nullptr); // No value
}
