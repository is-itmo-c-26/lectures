#include "plain-date.hpp"
#include "date-timestamp.hpp"

Date create_date(int year, unsigned month, unsigned day) {
    Date date;
    date.year = year;
    date.month = month;
    date.day = day;
    date.timestamp = to_timestamp(year, month, day);
    return date;
}
