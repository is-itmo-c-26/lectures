#include <iostream>

int main() {
    int* value = new int{42};
    std::cout << *value << '\n';
    delete value;

    int* numbers = new int[10]{};
    std::cout << numbers[9] << '\n';
    delete[] numbers;

    return 0;
}
