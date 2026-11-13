#include "print-rational.hpp"

int main() {
    const Rational zero;
    const Rational half{5, 10};
    const Rational negative{5, -10};
    const Rational positive{-5, -10};

    print_rational(zero);
    print_rational(half);
    print_rational(negative);
    print_rational(positive);
}
