#include <iostream>

void print(int) {
    std::cout << "int\n";
}
void print(const char*) {
    std::cout << "const char*\n";
}

int main() {
    print(0);       // int
    print("hello"); // const char*
    print(nullptr); // const char*
}
