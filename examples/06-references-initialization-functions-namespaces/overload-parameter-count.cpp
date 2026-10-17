#include <iostream>

void print() {
    std::cout << '\n';
}
void print(int value) {
    std::cout << value << '\n';
}
void print(int first, int second) {
    std::cout << first << ' ' << second << '\n';
}

int main() {
    print();
    print(10);
    print(10, 20);
}
