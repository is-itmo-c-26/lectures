#include <iostream>

void print(int value) {
    std::cout << value << '\n';
}

int main() {
    double value = 20.1;
    print(value); // Converts double to int; prints 20.
}
