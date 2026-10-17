#include <iostream>

int main() {
    int uninitialized; // No initial value; do not read it.
    int zero{};       // Initialized to 0.
    uninitialized = 7; // Assign before the first read.
    std::cout << uninitialized << ' ' << zero << '\n'; // 7 0
}
