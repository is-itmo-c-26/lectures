#pragma once
#include "normalize-rational.hpp"

class Rational {
public:
    Rational(int numerator = 0, int denominator = 1)
        : numerator_(numerator), denominator_(denominator) {
        NormalizeRational(numerator_, denominator_);
    }

    int Numerator() const { return numerator_; }
    int Denominator() const { return denominator_; }

private:
    int numerator_;
    int denominator_;
};
