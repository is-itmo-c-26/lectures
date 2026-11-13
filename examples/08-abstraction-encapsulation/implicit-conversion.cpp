#include <iostream>

#include "implicit-rational.hpp"

void PrintRational(const Rational& number) {
    std::cout << number.Numerator() << '/' << number.Denominator() << '\n';
}

int main() {
    Rational number = 1;
    PrintRational(number);
    PrintRational(2);
}
