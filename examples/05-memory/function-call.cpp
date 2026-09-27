#include <iostream>

int add(int a, int b) {
    int result = a + b;
    return result;
}

int main() {
    int a = 40;
    int b = 2;
    int answer = add(a, b);
    std::cout << answer << '\n';
}
