#include <iostream>

int main() {
    int decimal = 162;
    int octal = 0242;
    int hexadecimal = 0xA2;
    int binary = 0b1010'0010;
    unsigned long population = 1'000'000UL;

    std::cout << decimal << ' ' << octal << ' ' << hexadecimal << ' ' << binary << '\n';
    std::cout << population << '\n';

    return 0;
}
