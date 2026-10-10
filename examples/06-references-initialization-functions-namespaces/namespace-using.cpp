#include <iostream>

namespace screen {
    void print() { std::cout << "screen\n"; }
    void clear() { std::cout << "clear\n"; }
}

int main() {
    using screen::print;
    print();
    screen::clear();
    // clear(); // Error: using-declaration introduced only print.
}
