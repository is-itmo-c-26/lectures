#include "rational-io.hpp"
#include <iostream>

int main() {
    Rational first{1, 2}, second{3, 4}, third;
    third = second = first;
    std::cout << first << ' ' << second << ' ' << third << '\n';
}
