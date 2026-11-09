#include "print-rational.hpp"

int main() {
    Rational* number = new Rational{1, 2};
    print_rational(*number);
    delete number;
}
