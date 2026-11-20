#pragma once
#include "rational.hpp"
#include <iosfwd>

std::ostream& operator<<(std::ostream& stream, const Rational& value);
std::istream& operator>>(std::istream& stream, Rational& value);
