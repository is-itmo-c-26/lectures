#pragma once

inline bool IsValidDate(int year, unsigned month, unsigned day) {
    if (year < 1 || year > 9999 || month < 1 || month > 12 || day < 1) {
        return false;
    }
    const unsigned kDaysInMonth[] = {31, 28, 31, 30, 31, 30,
                                     31, 31, 30, 31, 30, 31};
    unsigned limit = kDaysInMonth[month - 1];
    const bool leap = year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
    if (month == 2 && leap) {
        ++limit;
    }
    return day <= limit;
}
