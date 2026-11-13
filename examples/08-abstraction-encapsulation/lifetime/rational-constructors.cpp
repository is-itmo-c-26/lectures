#include <iostream>

#include "../normalize-rational.hpp"
#include "rational.hpp"

Rational::Rational() : numerator_(0), denominator_(1) {
    std::cout << "Rational default ctor\n";
}

Rational::Rational(int numerator, int denominator)
    : numerator_(numerator), denominator_(denominator) {
    NormalizeRational(numerator_, denominator_);
    std::cout << "Rational value ctor\n";
}

Rational::~Rational() { std::cout << "Rational dtor\n"; }
