#include <cstdint>
#include <iostream>

std::uint64_t Factorial(int number) {
    if (number == 0) {
        return 1;
    }

    return number * Factorial(number - 1);
}

int main() {
    std::cout << Factorial(5) << '\n';

    return 0;
}
