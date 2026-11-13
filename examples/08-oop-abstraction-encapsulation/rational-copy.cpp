#include "print-rational.hpp"

int main() {
    Rational first{1, 2};
    Rational second = first;
    Rational third;
    third = first;
    first = Rational{3, 4};

    print_rational(first);
    print_rational(second);
    print_rational(third);
}
