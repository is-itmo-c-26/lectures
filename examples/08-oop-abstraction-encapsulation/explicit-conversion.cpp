#include "print-rational.hpp"

int main() {
    Rational number{1};
    print_rational(number);
    print_rational(Rational{2});
}
