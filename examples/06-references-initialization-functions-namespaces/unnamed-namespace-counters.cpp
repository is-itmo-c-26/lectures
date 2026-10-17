#include <iostream>

namespace {
    int counter = 0;
}
void increment() { ++counter; }

namespace a {
    namespace {
        int counter = 0;
    }
    void increment() { ++counter; }
}

int main() {
    ++counter;
    increment();
    a::increment();
    std::cout << counter << ' ' << a::counter << '\n';
}
