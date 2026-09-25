#include <iostream>

struct Empty {};

struct WithEmpty {
    Empty tag;
    int value;
};

int main() {
    std::cout << sizeof(Empty) << '\n';
    std::cout << sizeof(WithEmpty) << '\n';

    return 0;
}
