#include "rational-three-way.hpp"
#include <limits>

static_assert(std::numeric_limits<long long>::digits
              >= 2 * std::numeric_limits<int>::digits);

std::strong_ordering operator<=>(const Rational& lhs,
                                 const Rational& rhs) {
    const auto left = static_cast<long long>(lhs.numerator())
                    * rhs.denominator();
    const auto right = static_cast<long long>(rhs.numerator())
                     * lhs.denominator();
    return left <=> right;
}
