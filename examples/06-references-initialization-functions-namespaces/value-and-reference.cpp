#include <iostream>

void increment_copy(int value) {
    ++value;
    std::cout << value << '\n';
}
void increment_original(int& value) {
    ++value;
}

int main() {
    int count = 10;
    increment_copy(count); // Prints 11; count is still 10.
    std::cout << count << '\n'; // 10
    increment_original(count);
    std::cout << count << '\n'; // 11
}
