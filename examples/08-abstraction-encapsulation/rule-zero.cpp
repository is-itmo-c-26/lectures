#include <iostream>

#include "array-value.hpp"

int main() {
    IntArray first(2);
    first.At(0) = 7;
    IntArray second = first;
    second.At(0) = 9;
    std::cout << first.At(0) << ' ' << second.At(0) << '\n';
}
