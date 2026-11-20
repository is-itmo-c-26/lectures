#include "int-array.hpp"
#include <iostream>

int main() {
    IntArray values{3};
    values[1] = 42;
    const IntArray& view = values;
    std::cout << view[1] << '\n';
}
