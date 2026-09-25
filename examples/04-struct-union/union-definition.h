#pragma once
#include <cstdint>

union Value {
    std::int64_t integer;
    double real;
    char text[16];
};
