#include <iostream>

namespace screen {
    void print() { std::cout << "screen\n"; }
}
namespace file {
    void print() { std::cout << "file\n"; }
}

int main() {
    screen::print();
    file::print();
}
