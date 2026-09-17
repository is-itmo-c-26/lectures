#include <iostream>

unsigned long long factorial(unsigned int number) {
    if (number == 0) {
        return 1;
    }

    return number * factorial(number - 1);
}

int main() {
    std::cout << factorial(5) << '\n';

    return 0;
}
