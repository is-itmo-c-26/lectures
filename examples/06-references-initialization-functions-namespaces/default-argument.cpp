#include <iostream>

void print_pair(int first, int second = 0) {
    std::cout << first << ' ' << second << '\n';
}

int main() {
    print_pair(10);     // 10 0
    print_pair(10, 20); // 10 20
}
