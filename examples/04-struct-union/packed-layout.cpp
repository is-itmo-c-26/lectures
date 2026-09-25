#include <cstdint>
#include <iostream>

#pragma pack(push, 1)

struct PackedData {
    char a;
    std::int64_t b;
    std::uint8_t c;
    std::uint32_t d;
};

#pragma pack(pop)

int main() {
    std::cout << sizeof(PackedData) << ' ' << alignof(PackedData) << '\n';

    return 0;
}
