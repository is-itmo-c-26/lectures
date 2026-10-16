#include <iostream>

void Print() {
    std::cout << '\n';
}

void Print(int x) {
    std::cout << x << '\n';
}

void Print(const char* text) {
    std::cout << text << '\n';
}

void Print(int x, int y) {
    std::cout << x << ' ' << y << '\n';
}

int main() {
    Print();
    Print(10);
    Print("Hello world!");
    Print(10, 20);
}
