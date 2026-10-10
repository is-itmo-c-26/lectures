#include <iostream>

namespace {
    int counter = 0;
}

void increment() {
    ++counter;
}

int main() {
    increment();
    std::cout << counter << '\n'; // 1
}
