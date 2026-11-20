#include "rational.hpp"
#include <iostream>

int main() {
    Rational half{1, 2};
    float value = static_cast<float>(half);
    std::cout << value << '\n';
}
