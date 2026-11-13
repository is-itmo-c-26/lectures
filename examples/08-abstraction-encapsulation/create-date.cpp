#include "date-timestamp.hpp"
#include "plain-date.hpp"

Date CreateDate(int year, unsigned month, unsigned day) {
    Date date;
    date.year = year;
    date.month = month;
    date.day = day;
    date.timestamp = ToTimestamp(year, month, day);
    return date;
}
