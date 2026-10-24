#include <iostream>

#define MAXIMUM(x, y) ((x) > (y) ? (x) : (y))

int main() {
    int i = 1;
    int j = 2;
    int m = MAXIMUM(i++, j++);

    std::cout << m << ' ' << i << ' ' << j << '\n';

    return 0;
}
