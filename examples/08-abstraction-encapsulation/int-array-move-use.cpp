#include <iostream>
#include <utility>

#include "move/int-array.hpp"

int main() {
    IntArray first(2);
    first.At(0) = 7;
    IntArray second = std::move(first);
    std::cout << first.Size() << ' ' << second.At(0) << '\n';

    IntArray third(5);
    third = std::move(second);
    std::cout << second.Size() << ' ' << third.At(0) << '\n';
}
