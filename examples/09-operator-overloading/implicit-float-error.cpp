#include "rational.hpp"
#include <iostream>

int main() {
    Rational half{1, 2};
    float value = half;
    std::cout << value << '\n';
}
