#include "date-alternative.hpp"
#include "date-timestamp.hpp"

int Date::year() const {
    return from_timestamp(timestamp_).year;
}

unsigned Date::month() const {
    return from_timestamp(timestamp_).month;
}

unsigned Date::day() const {
    return from_timestamp(timestamp_).day;
}

std::int64_t Date::timestamp() const {
    return timestamp_;
}
