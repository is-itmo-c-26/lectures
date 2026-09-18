#include <iostream>

int StringCompare(const char* first, const char* second) {
    while (*first != '\0' && *first == *second) {
        ++first;
        ++second;
    }
    return static_cast<unsigned char>(*first)
         - static_cast<unsigned char>(*second);
}

int main() {
    std::cout << StringCompare("cat", "cat") << '\n';  // 0
    std::cout << StringCompare("cat", "car") << '\n';  // > 0
    std::cout << StringCompare("cat", "cats") << '\n'; // < 0
}
