#include <cstddef>
#include <iostream>

int StringCompare(const char* first, const char* second) {
    std::size_t index = 0;
    while (first[index] != '\0' && first[index] == second[index]) {
        ++index;
    }
    return static_cast<unsigned char>(first[index])
         - static_cast<unsigned char>(second[index]);
}

int main() {
    std::cout << StringCompare("cat", "cat") << '\n';  // 0
    std::cout << StringCompare("cat", "car") << '\n';  // > 0
    std::cout << StringCompare("cat", "cats") << '\n'; // < 0
}
