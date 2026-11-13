#include "constructors/rational.hpp"

Rational::Rational(const Rational& other)
    : numerator_(other.numerator_)
    , denominator_(other.denominator_)
{
}
