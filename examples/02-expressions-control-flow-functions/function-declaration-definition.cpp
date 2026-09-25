#include <iostream>

int Maximum(int left, int right);

int main() {
    int result = Maximum(10, 2);
    std::cout << result << '\n';

    return 0;
}

int Maximum(int left, int right) {
    return left > right ? left : right;
}
