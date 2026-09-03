#include <iostream>

int addition(int left, int right) {
    return left + right;
}

int main() {
    int result = addition(5, 3);
    std::cout << result << '\n';

    return 0;
}
