#include <cstdint>
#include <iostream>

std::uint64_t Factorial(int number) {
    std::uint64_t result = 1;

    for (int factor = 2; factor <= number; ++factor) {
        result *= factor;
    }

    return result;
}

int main() {
    std::cout << Factorial(5) << '\n';

    return 0;
}
