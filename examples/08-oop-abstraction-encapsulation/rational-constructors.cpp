#include "constructors/rational.hpp"
#include <iostream>
#include <utility>

int main() {
    Rational original{5, 10};
    Rational copy{original};
    Rational moved{std::move(original)};
    std::cout << copy.numerator() << '/' << copy.denominator() << '\n';
    std::cout << moved.numerator() << '/' << moved.denominator() << '\n';
    std::cout << original.numerator() << '/' << original.denominator() << '\n';
}
