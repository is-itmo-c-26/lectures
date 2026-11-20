#include "friend-rational.hpp"
#include <ostream>

std::ostream& operator<<(std::ostream& stream,
                         const Rational& value) {
    stream << value.numerator_ << '/' << value.denominator_;
    return stream;
}
