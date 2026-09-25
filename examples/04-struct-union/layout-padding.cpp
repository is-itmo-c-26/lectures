#include <cstddef>
#include <cstdint>
#include <iostream>

struct PoorLayout {
    char a;           // 1 байт
    std::int64_t b;   // 8 байт
    std::uint8_t c;   // 1 байт
    std::uint32_t d;  // 4 байта
};

struct CompactLayout {
    std::int64_t b;   // 8 байт
    std::uint32_t d;  // 4 байта
    char a;           // 1 байт
    std::uint8_t c;   // 1 байт
};

int main() {
    std::cout << sizeof(PoorLayout) << '/' << alignof(PoorLayout) << ' '
              << sizeof(CompactLayout) << '/' << alignof(CompactLayout) << '\n';
    std::cout << offsetof(PoorLayout, a) << ' ' << offsetof(PoorLayout, b) << ' '
              << offsetof(PoorLayout, c) << ' ' << offsetof(PoorLayout, d) << '\n';

    return 0;
}
