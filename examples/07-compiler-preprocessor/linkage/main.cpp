#include <iostream>

#include "math.hpp"

const float kE = 2.72F;
int total = 0;

int main() {
    counter = 3;
    total = 2;

    std::cout << "kPi     " << kPi << ' ' << &kPi << '\n';
    std::cout << "kE      " << kE << ' ' << &kE << '\n';
    std::cout << "kAnswer " << kAnswer << ' ' << &kAnswer << '\n';
    std::cout << "counter " << counter << ' ' << &counter << '\n';
    std::cout << "total   " << total << ' ' << &total << '\n';

    std::cout << "--- PrintInfo() из math.cpp ---\n";
    PrintInfo();

    return 0;
}
