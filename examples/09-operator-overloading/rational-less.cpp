#include "rational-comparison.hpp"
#include <limits>

static_assert(std::numeric_limits<long long>::digits
              >= 2 * std::numeric_limits<int>::digits);

bool operator<(const Rational& lhs, const Rational& rhs) {
    return static_cast<long long>(lhs.numerator()) * rhs.denominator()
         < static_cast<long long>(rhs.numerator()) * lhs.denominator();
}
