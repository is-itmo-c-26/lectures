#include "date.hpp"
#include "date-timestamp.hpp"

int Date::year() const {
    return year_;
}

unsigned Date::month() const {
    return month_;
}

unsigned Date::day() const {
    return day_;
}

std::int64_t Date::timestamp() const {
    return to_timestamp(year_, month_, day_);
}
