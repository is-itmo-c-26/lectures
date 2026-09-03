#include <iostream>

int main() {
    double fraction = 0.15;
    float single_precision = 0.15F;
    long double scientific = 15E-2L;
    double large_value = 1.5E6;

    std::cout << fraction << '\n';
    std::cout << single_precision << '\n';
    std::cout << scientific << '\n';
    std::cout << large_value << '\n';

    return 0;
}
