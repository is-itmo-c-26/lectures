#include <iostream>

void Print(int x) {
    std::cout << "int: " << x << '\n';
}

void Print(float x) {
    std::cout << "float: " << x << '\n';
}

int main() {
    Print(20);     // int — точное совпадение
    Print(20.1F);  // float — суффикс F делает литерал float

    return 0;
}
