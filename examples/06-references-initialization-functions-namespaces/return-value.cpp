#include <iostream>

int make_value() {
    int value = 20;
    return value;
}

int main() {
    int result = make_value();
    std::cout << result << '\n'; // 20
}
