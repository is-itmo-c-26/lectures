#include <cstddef>
#include <cstdint>
#include <iostream>

struct Data {
    char tag;
    std::int32_t value;
};

#pragma pack(push, 1)
struct PackedData {
    char tag;
    std::int32_t value;
};
#pragma pack(pop)

int main() {
    std::cout << "type: size alignment value-offset\n";
    std::cout << "Data: " << sizeof(Data) << ' ' << alignof(Data)
              << ' ' << offsetof(Data, value) << '\n';
    std::cout << "PackedData: " << sizeof(PackedData)
              << ' ' << alignof(PackedData)
              << ' ' << offsetof(PackedData, value) << '\n';
}
