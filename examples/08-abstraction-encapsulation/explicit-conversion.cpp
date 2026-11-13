#include "print-rational.hpp"

int main() {
    Rational number{1};
    PrintRational(number);
    PrintRational(Rational{2});
}
