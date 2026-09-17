#include <iostream>

int maximum(int left, int right);

int main() {
    int result = maximum(10, 2);
    std::cout << result << '\n';

    return 0;
}

int maximum(int left, int right) {
    return left > right ? left : right;
}
