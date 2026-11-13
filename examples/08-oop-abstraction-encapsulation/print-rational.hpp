#pragma once
#include "rational.hpp"
#include <iostream>

inline void print_rational(const Rational& number) {
    std::cout << number.numerator() << '/' << number.denominator() << '\n';
}
