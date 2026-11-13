#include "move/int-array.hpp"
#include <iostream>
#include <utility>

int main() {
    IntArray first(2);
    first.at(0) = 7;
    IntArray second = std::move(first);
    std::cout << first.size() << ' ' << second.at(0) << '\n';

    IntArray third(5);
    third = std::move(second);
    std::cout << second.size() << ' ' << third.at(0) << '\n';
}
