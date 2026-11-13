#pragma once
#include <cstdint>

struct Date {
    int year;
    unsigned month;
    unsigned day;
    std::int64_t timestamp;  // секунды с 1970-01-01 UTC
};

Date CreateDate(int year, unsigned month, unsigned day);
