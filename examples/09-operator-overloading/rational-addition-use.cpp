#include "rational-addition.hpp"
#include "rational-io.hpp"
#include <iostream>

int main() {
    Rational first{1, 2}, second{1, 3};
    Rational sum = first + second;
    std::cout << first << ' ' << second << ' ' << sum << '\n';

    first += second;
    std::cout << first << '\n';
}
