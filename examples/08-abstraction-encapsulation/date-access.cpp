#include "date-timestamp.hpp"
#include "date.hpp"

int Date::Year() const { return year_; }

unsigned Date::Month() const { return month_; }

unsigned Date::Day() const { return day_; }

std::int64_t Date::Timestamp() const {
    return ToTimestamp(year_, month_, day_);
}
