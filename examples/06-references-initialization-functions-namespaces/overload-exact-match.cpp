#include <iostream>

void print(int value) {
    std::cout << "int: " << value << '\n';
}
void print(float value) {
    std::cout << "float: " << value << '\n';
}

int main() {
    print(20);    // int: exact match.
    print(20.1F); // float: exact match.
}
