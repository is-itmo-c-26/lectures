#include <iostream>
#include <utility>

#include "constructors/rational.hpp"

int main() {
    Rational original{5, 10};
    Rational copy{original};
    Rational moved{std::move(original)};
    std::cout << copy.Numerator() << '/' << copy.Denominator() << '\n';
    std::cout << moved.Numerator() << '/' << moved.Denominator() << '\n';
    std::cout << original.Numerator() << '/' << original.Denominator() << '\n';
}
