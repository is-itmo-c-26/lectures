#include <iostream>

void print(int value) {
    std::cout << "int: " << value << '\n';
}
void print(double value) {
    std::cout << "double: " << value << '\n';
}

int main() {
    print(20);   // int
    print(20.1); // double
}
