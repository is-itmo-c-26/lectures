#include "date-alternative.hpp"
#include "date-timestamp.hpp"

Date::Date(int year, unsigned month, unsigned day)
    : timestamp_(to_timestamp(year, month, day)) {
}

Date& Date::set(int year, unsigned month, unsigned day) {
    timestamp_ = to_timestamp(year, month, day);
    return *this;
}
