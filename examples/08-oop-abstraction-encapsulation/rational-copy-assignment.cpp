#include "constructors/rational.hpp"

Rational& Rational::operator=(const Rational& other) {
    numerator_ = other.numerator_;
    denominator_ = other.denominator_;
    return *this;
}
