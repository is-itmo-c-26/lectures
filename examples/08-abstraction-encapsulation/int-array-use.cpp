#include <iostream>

#include "int-array.hpp"

int main() {
    IntArray first(2);
    first.At(0) = 7;
    IntArray second = first;
    second.At(0) = 9;
    std::cout << first.At(0) << ' ' << second.At(0) << '\n';

    IntArray third(5);
    third = first;
    third.At(0) = 11;
    std::cout << third.Size() << ' ' << first.At(0) << '\n';
}
