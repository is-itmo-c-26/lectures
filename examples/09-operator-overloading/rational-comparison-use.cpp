#include "rational-comparison.hpp"
#include <iostream>

int main() {
    Rational half{1, 2}, same{2, 4}, negative{-1, 3};
    std::cout << std::boolalpha;
    std::cout << (half == same) << ' ' << (half != same) << '\n';
    std::cout << (negative < half) << ' ' << (half > negative) << '\n';
    std::cout << (half <= same) << ' ' << (half >= same) << '\n';
}
