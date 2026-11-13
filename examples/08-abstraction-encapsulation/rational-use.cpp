#include "print-rational.hpp"

int main() {
    const Rational zero;
    const Rational half{5, 10};
    const Rational negative{5, -10};
    const Rational positive{-5, -10};

    PrintRational(zero);
    PrintRational(half);
    PrintRational(negative);
    PrintRational(positive);
}
