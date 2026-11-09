#pragma once
#include <cstdint>

struct CalendarDate {
    int year;
    unsigned month;
    unsigned day;
};

std::int64_t to_timestamp(int year, unsigned month, unsigned day);
CalendarDate from_timestamp(std::int64_t timestamp);
