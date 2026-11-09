#include "rational.hpp"
#include <iostream>
#include <utility>

Rational& Rational::operator=(const Rational& other) {
    std::cout << "Rational copy assignment: " << this
              << " <- " << &other << '\n';
    numerator_ = other.numerator_;
    denominator_ = other.denominator_;
    return *this;
}
Rational& Rational::operator=(Rational&& other) noexcept {
    std::cout << "Rational move assignment: " << this
              << " <- " << &other << '\n';
    if (this != &other) {
        numerator_ = std::exchange(other.numerator_, 0);
        denominator_ = std::exchange(other.denominator_, 1);
    }
    return *this;
}
