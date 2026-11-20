#include "rational-io.hpp"
#include <ostream>

std::ostream& operator<<(std::ostream& stream, const Rational& value) {
    stream << value.numerator() << '/' << value.denominator();
    return stream;
}
