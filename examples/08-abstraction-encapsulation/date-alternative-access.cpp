#include "date-alternative.hpp"
#include "date-timestamp.hpp"

int Date::Year() const { return FromTimestamp(timestamp_).year; }

unsigned Date::Month() const { return FromTimestamp(timestamp_).month; }

unsigned Date::Day() const { return FromTimestamp(timestamp_).day; }

std::int64_t Date::Timestamp() const { return timestamp_; }
