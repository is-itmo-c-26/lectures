#pragma once
#include "rational.hpp"
#include <compare>

std::strong_ordering operator<=>(const Rational& lhs, const Rational& rhs);
