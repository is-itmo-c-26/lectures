#pragma once
#include <limits>
#include <numeric>
#include <stdexcept>
static_assert(std::numeric_limits<int>::digits <
              std::numeric_limits<long long>::digits);

inline void NormalizeRational(int& numerator, int& denominator) {
    if (denominator == 0) {
        throw std::invalid_argument("denominator must be nonzero");
    }
    long long n = numerator, d = denominator;
    const auto divisor = std::gcd(n, d);
    n /= divisor;
    d /= divisor;
    if (d < 0) {
        n = -n;
        d = -d;
    }
    if (n < std::numeric_limits<int>::min() ||
        n > std::numeric_limits<int>::max() ||
        d > std::numeric_limits<int>::max()) {
        throw std::overflow_error("normalized rational does not fit in int");
    }
    numerator = static_cast<int>(n);
    denominator = static_cast<int>(d);
}
