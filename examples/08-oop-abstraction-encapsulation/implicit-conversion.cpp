#include "implicit-rational.hpp"
#include <iostream>

void print_rational(const Rational& number) {
    std::cout << number.numerator() << '/' << number.denominator() << '\n';
}

int main() {
    Rational number = 1;
    print_rational(number);
    print_rational(2);
}
