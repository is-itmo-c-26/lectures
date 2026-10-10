#include <iostream>

int main() {
    int copy = 2;    // Copy-initialization.
    int direct(2);   // Direct-initialization.
    int list{2};     // Direct-list-initialization.
    int zero{};      // Empty list leads to value-initialization: 0.
    std::cout << copy << ' ' << direct << ' ' << list << ' ' << zero;
}
