#include <iostream>
#include <utility>

#include "rational.hpp"

Rational& Rational::operator=(const Rational& other) {
    std::cout << "Rational copy assignment\n";
    numerator_ = other.numerator_;
    denominator_ = other.denominator_;
    return *this;
}

Rational& Rational::operator=(Rational&& other) noexcept {
    std::cout << "Rational move assignment\n";
    if (this != &other) {
        numerator_ = std::exchange(other.numerator_, 0);
        denominator_ = std::exchange(other.denominator_, 1);
    }
    return *this;
}
