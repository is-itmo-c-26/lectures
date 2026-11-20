#pragma once
#include "rational.hpp"
#include <limits>
#include <numeric>
#include <stdexcept>

static_assert(std::numeric_limits<long long>::digits
              >= 2 * std::numeric_limits<int>::digits + 1);

inline Rational add_rationals(const Rational& lhs, const Rational& rhs) {
    long long numerator = static_cast<long long>(lhs.numerator()) * rhs.denominator()
                        + static_cast<long long>(rhs.numerator()) * lhs.denominator();
    long long denominator = static_cast<long long>(lhs.denominator()) * rhs.denominator();
    const auto divisor = std::gcd(numerator, denominator);
    numerator /= divisor;
    denominator /= divisor;
    if (numerator < std::numeric_limits<int>::min()
        || numerator > std::numeric_limits<int>::max()
        || denominator > std::numeric_limits<int>::max()) {
        throw std::overflow_error("sum does not fit in Rational");
    }
    return Rational{static_cast<int>(numerator), static_cast<int>(denominator)};
}
