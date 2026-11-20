#pragma once
#include "normalize-rational.hpp"
#include <iosfwd>

class Rational {
public:
    explicit Rational(int numerator = 0, int denominator = 1)
        : numerator_(numerator), denominator_(denominator) {
        normalize_rational(numerator_, denominator_);
    }
    friend std::ostream& operator<<(std::ostream& stream,
                                    const Rational& value);

private:
    int numerator_;
    int denominator_;
};
