#include "constructors/rational.hpp"
#include "normalize-rational.hpp"

Rational::Rational(int numerator, int denominator)
    : numerator_(numerator), denominator_(denominator) {
    NormalizeRational(numerator_, denominator_);
}
