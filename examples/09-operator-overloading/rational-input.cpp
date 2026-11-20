#include "rational-io.hpp"
#include <istream>

std::istream& operator>>(std::istream& stream, Rational& value) {
    int numerator = 0, denominator = 0;
    char separator = '\0';
    if (!(stream >> numerator >> separator >> denominator)) {
        return stream;
    }
    if (separator != '/' || denominator == 0) {
        stream.setstate(std::ios::failbit);
        return stream;
    }
    try {
        value = Rational{numerator, denominator};
    } catch (const std::overflow_error&) {
        stream.setstate(std::ios::failbit);
    }
    return stream;
}
