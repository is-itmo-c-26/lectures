#include <iostream>

int main() {
    int value = 0;
    int* pointer = &value;
    int** pointer_to_pointer = &pointer;
    int*** third_level = &pointer_to_pointer;

    std::cout << value << '\n';
    std::cout << *pointer << '\n';
    std::cout << **pointer_to_pointer << '\n';
    std::cout << ***third_level << '\n';

    return 0;
}
