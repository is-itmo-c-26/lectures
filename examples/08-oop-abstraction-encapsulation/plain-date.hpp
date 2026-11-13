#pragma once
#include <cstdint>

struct Date {
    int year;
    unsigned month;
    unsigned day;
    std::int64_t timestamp; // seconds since 1970-01-01 00:00 UTC
};

Date create_date(int year, unsigned month, unsigned day);
