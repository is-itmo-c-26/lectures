#include <iostream>

int total = 0;

void Count() {
    int local = 0;
    static int calls = 0;
    std::cout << ++total << ' ' << ++local << ' ' << ++calls << '\n';
}

int main() {
    Count();
    Count();
    return 0;
}
