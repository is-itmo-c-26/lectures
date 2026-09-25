#pragma once
#include <cstdint>

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
