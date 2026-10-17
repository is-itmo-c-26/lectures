#include <iostream>

int main() {
    int first = 10;
    int second = 20;
    int& alias = first;
    alias = second; // Assign to first; alias still refers to first.
    alias = 30;
    std::cout << first << ' ' << second << '\n'; // 30 20
}
