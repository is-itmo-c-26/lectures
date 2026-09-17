#include <iostream>

unsigned long long factorial(unsigned int number) {
    unsigned long long result = 1;

    for (unsigned int factor = 2; factor <= number; ++factor) {
        result *= factor;
    }

    return result;
}

int main() {
    std::cout << factorial(5) << '\n';

    return 0;
}
