#include "rational.hpp"
#include <limits>
#include <stdexcept>

Rational& Rational::operator++() {
    if (numerator_ > std::numeric_limits<int>::max() - denominator_) {
        throw std::overflow_error("increment does not fit in int");
    }
    numerator_ += denominator_;
    return *this;
}
