#include "rational.hpp"
#include "add-rationals.hpp"

Rational& Rational::operator+=(const Rational& rhs) {
    *this = add_rationals(*this, rhs);
    return *this;
}
