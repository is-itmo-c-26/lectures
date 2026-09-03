#include <iostream>

int main() {
    for (int i = 0; i < 3; ++i) {
        if (i == 1) {
            continue;
        }
        std::cout << i << ' ';
    }
    std::cout << '\n';

    return 0;
}
