#pragma once
#include <cstdint>

struct CalendarDate {
    int year;
    unsigned month;
    unsigned day;
};

std::int64_t ToTimestamp(int year, unsigned month, unsigned day);
CalendarDate FromTimestamp(std::int64_t timestamp);
