#pragma once
#include <iostream>

#include "rational.hpp"

inline void PrintRational(const Rational& number) {
    std::cout << number.Numerator() << '/' << number.Denominator() << '\n';
}
