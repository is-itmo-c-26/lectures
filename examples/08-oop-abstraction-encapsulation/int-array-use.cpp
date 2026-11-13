#include "int-array.hpp"
#include <iostream>

int main() {
    IntArray first(2);
    first.at(0) = 7;
    IntArray second = first;
    second.at(0) = 9;
    std::cout << first.at(0) << ' ' << second.at(0) << '\n';

    IntArray third(5);
    third = first;
    third.at(0) = 11;
    std::cout << third.size() << ' ' << first.at(0) << '\n';
}
