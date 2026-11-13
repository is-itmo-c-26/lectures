#include <iostream>

#define SQUARE(x) ((x) * (x))

int main() {
    int i = 3;
    std::cout << SQUARE(i++) << '\n';

    return 0;
}
