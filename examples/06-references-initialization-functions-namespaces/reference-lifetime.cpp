#include <iostream>

int main() {
    int x = 10;
    int& a = x;
    const int& b = x;
    const int& c = 42;
    // int& d = 42;

    std::cout << a << ' ' << b << ' ' << c << '\n';
}
