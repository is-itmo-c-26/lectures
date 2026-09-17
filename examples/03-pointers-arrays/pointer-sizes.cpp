#include <iostream>

int main() {
    bool flag = true;
    long number = 128L;

    bool* flag_pointer = &flag;
    long* number_pointer = &number;

    std::cout << sizeof(flag) << ' ' << sizeof(number) << '\n';
    std::cout << sizeof(flag_pointer) << ' ' << sizeof(number_pointer) << '\n';

    return 0;
}
