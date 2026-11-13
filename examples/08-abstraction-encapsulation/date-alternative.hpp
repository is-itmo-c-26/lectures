#pragma once
#include <cstdint>

class Date {
public:
    Date(int year, unsigned month, unsigned day);
    Date& Set(int year, unsigned month, unsigned day);

    int Year() const;
    unsigned Month() const;
    unsigned Day() const;
    std::int64_t Timestamp() const;

private:
    std::int64_t timestamp_;
};
