#include <cstdint>
#include <iostream>

int main() {
    std::cout << "sizeof(char) = " << sizeof(char) << '\n';
    std::cout << "sizeof(short) = " << sizeof(short) << '\n';
    std::cout << "sizeof(int) = " << sizeof(int) << '\n';
    std::cout << "sizeof(long) = " << sizeof(long) << '\n';
    std::cout << "sizeof(long long) = " << sizeof(long long) << '\n';
    std::cout << "sizeof(std::int32_t) = " << sizeof(std::int32_t) << '\n';

    return 0;
}
