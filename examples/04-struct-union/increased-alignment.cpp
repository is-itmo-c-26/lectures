#include <cstdint>
#include <iostream>

struct Data {
    std::int32_t value;
};

struct alignas(64) AlignedData {
    std::int32_t value;
};

int main() {
    AlignedData items[2]{};
    std::cout << "Data: " << sizeof(Data) << ' ' << alignof(Data) << '\n';
    std::cout << "AlignedData: " << sizeof(AlignedData)
              << ' ' << alignof(AlignedData) << '\n';
    std::cout << "array size: " << sizeof(items) << '\n';
    for (const AlignedData& item : items) {
        auto address = reinterpret_cast<std::uintptr_t>(&item);
        std::cout << "address % 64: " << address % 64 << '\n';
    }
}
