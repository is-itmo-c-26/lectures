#include <iostream>

int Addition(int left, int right) {
    return left + right;
}

int main() {
    int result = Addition(5, 3);
    std::cout << result << '\n';

    return 0;
}
