#include "rational-three-way.hpp"
#include <iostream>

int main() {
    Rational half{1, 2}, third{1, 3}, same{2, 4};
    std::cout << std::boolalpha
              << ((half <=> third) > 0) << '\n'
              << ((half <=> same) == 0) << '\n'
              << (half < third) << '\n'
              << (half >= same) << '\n';
}
