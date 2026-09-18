#include <cstddef>
#include <format>
#include <iostream>

void PrintBytes(const void* object, std::size_t size) {
    const auto* bytes = (const unsigned char*)object;
    for (std::size_t index = 0; index < size; ++index) {
        std::cout << std::format("{:08b} ", bytes[index]);
    }
    std::cout << '\n';
}

int main() {
    int value = 2 << 10;
    PrintBytes(&value, sizeof(value));
    value = 239;
    PrintBytes(&value, sizeof(value));
}
