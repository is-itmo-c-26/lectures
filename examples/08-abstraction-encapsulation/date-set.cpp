#include <stdexcept>

#include "date.hpp"
#include "valid-date.hpp"

Date& Date::Set(int year, unsigned month, unsigned day) {
    if (!IsValidDate(year, month, day)) {
        throw std::invalid_argument("invalid date");
    }
    year_ = year;
    month_ = month;
    day_ = day;
    return *this;
}
