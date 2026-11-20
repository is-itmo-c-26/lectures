#include "rational-addition.hpp"

Rational operator+(Rational lhs, const Rational& rhs) {
    lhs += rhs;
    return lhs;
}
