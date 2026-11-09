#include "date.hpp"
#include "valid-date.hpp"
#include <stdexcept>

Date& Date::set(int year, unsigned month, unsigned day) {
    if (!valid_date(year, month, day)) {
        throw std::invalid_argument("invalid date");
    }
    year_ = year;
    month_ = month;
    day_ = day;
    return *this;
}
