#include <iostream>

void PrintSize(int* array) {
    std::cout << sizeof(array) << '\n';
}

int main() {
    int values[10]{};
    std::cout << sizeof(values) << '\n';
    PrintSize(values);
}
