#include "constructors/rational.hpp"
#include <utility>

Rational::Rational(Rational&& other) noexcept
    : numerator_(std::exchange(other.numerator_, 0)),
      denominator_(std::exchange(other.denominator_, 1)) {
}
