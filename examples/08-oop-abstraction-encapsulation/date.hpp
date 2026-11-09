#pragma once
#include <cstdint>

class Date {
public:
    Date(int year, unsigned month, unsigned day);
    Date& set(int year, unsigned month, unsigned day);

    int year() const;
    unsigned month() const;
    unsigned day() const;
    std::int64_t timestamp() const;

private:
    int year_;
    unsigned month_;
    unsigned day_;
};
