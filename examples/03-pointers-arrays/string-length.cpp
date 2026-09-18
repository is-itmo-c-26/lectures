#include <cstddef>
#include <iostream>

std::size_t StringLength(const char* string) {
    std::size_t length = 0;
    while (*string != '\0') {
        ++string;
        ++length;
    }
    return length;
}

int main() {
    std::cout << StringLength("Hello") << '\n';  // 5
    std::cout << StringLength("") << '\n';       // 0
}
