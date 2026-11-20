#include "rational-io.hpp"
#include <iostream>
#include <sstream>

int main() {
    std::istringstream input{"2/4 3/0"};
    Rational value{7, 8};
    if (input >> value) {
        std::cout << value << '\n';
    }
    if (!(input >> value)) {
        std::cout << "invalid input; value = " << value << '\n';
    }
}
