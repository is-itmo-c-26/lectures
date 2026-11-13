#include <iostream>

#include "square.hpp"

int Area(int side);

int main() {
    std::cout << Square(3) + Area(4) << '\n';

    return 0;
}
