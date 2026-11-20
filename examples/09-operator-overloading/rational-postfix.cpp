#include "rational.hpp"

Rational Rational::operator++(int) {
    Rational previous{*this};
    ++*this;
    return previous;
}
