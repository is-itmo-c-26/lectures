#include "rational-io.hpp"
#include <iostream>

int main() {
    Rational value{1, 2};
    Rational previous = value++;
    std::cout << previous << ' ' << value << '\n';
    Rational& current = ++value;
    std::cout << current << ' ' << (&current == &value) << '\n';
}
