#include "rational-comparison.hpp"

bool operator==(const Rational& lhs, const Rational& rhs) {
    return lhs.numerator() == rhs.numerator()
        && lhs.denominator() == rhs.denominator();
}

bool operator!=(const Rational& lhs, const Rational& rhs) {
    return !(lhs == rhs);
}
