#include "date-alternative.hpp"

#include "date-timestamp.hpp"

Date::Date(int year, unsigned month, unsigned day)
    : timestamp_(ToTimestamp(year, month, day)) {}

Date& Date::Set(int year, unsigned month, unsigned day) {
    timestamp_ = ToTimestamp(year, month, day);
    return *this;
}
