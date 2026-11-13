#include "rational.hpp"
#include "../normalize-rational.hpp"
#include <iostream>

Rational::Rational() : numerator_(0), denominator_(1) {
    std::cout << "Rational default ctor: " << this << '\n';
}
Rational::Rational(int numerator, int denominator)
    : numerator_(numerator), denominator_(denominator) {
    std::cout << "Rational value ctor: " << this << '\n';
    normalize_rational(numerator_, denominator_);
}
Rational::~Rational() {
    std::cout << "Rational dtor: " << this << '\n';
}
