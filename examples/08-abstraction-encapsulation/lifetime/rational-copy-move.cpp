#include <iostream>
#include <utility>

#include "rational.hpp"

Rational::Rational(const Rational& other)
    : numerator_(other.numerator_), denominator_(other.denominator_) {
    std::cout << "Rational copy ctor\n";
}

Rational::Rational(Rational&& other) noexcept
    : numerator_(std::exchange(other.numerator_, 0)),
      denominator_(std::exchange(other.denominator_, 1)) {
    std::cout << "Rational move ctor\n";
}
