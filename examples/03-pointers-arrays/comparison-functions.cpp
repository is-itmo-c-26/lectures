#include <iostream>

bool Less(int left, int right) {
    return left < right;
}

bool Greater(int left, int right) {
    return left > right;
}

int main() {
    bool (*comes_before)(int, int) = Less;
    std::cout << comes_before(1, 2) << '\n';  // 1
    comes_before = Greater;
    std::cout << comes_before(1, 2) << '\n';  // 0
}
