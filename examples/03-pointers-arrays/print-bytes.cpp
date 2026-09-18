#include <cstddef>
#include <cstdint>
#include <format>
#include <iostream>

void PrintBytes(const void* object, std::size_t size) {
    const auto* bytes = static_cast<const std::uint8_t*>(object);

    for (std::size_t index = 0; index < size; ++index) {
        std::cout << std::format("{:08b} ", bytes[index]);
    }

    std::cout << '\n';
}

int main() {
    int value = 2 << 10;  // 2048 = 0x00000800
    PrintBytes(&value, sizeof(value));

    return 0;
}
