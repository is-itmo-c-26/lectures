#include <iostream>

int main() {
    int value = 10;
    int& alias = value;
    alias = 20;
    std::cout << value << '\n'; // 20
    std::cout << std::boolalpha << (&alias == &value) << '\n'; // true
}
