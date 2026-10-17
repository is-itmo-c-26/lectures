#include <iostream>

int main() {
    int value = 10;
    const int& view = value;
    // view = 20; // Error: cannot modify value through this reference.
    value = 20;
    std::cout << view << '\n'; // 20
}
