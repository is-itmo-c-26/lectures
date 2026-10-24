#include <iostream>

#include "math.hpp"

void PrintInfo() {
    std::cout << "kPi     " << kPi << ' ' << &kPi << '\n';
    std::cout << "kE      " << kE << ' ' << &kE << '\n';
    std::cout << "kAnswer " << kAnswer << ' ' << &kAnswer << '\n';
    std::cout << "counter " << counter << ' ' << &counter << '\n';
    std::cout << "total   " << total << ' ' << &total << '\n';
}
