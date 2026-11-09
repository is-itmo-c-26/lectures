#include "date-timestamp.hpp"
#include <chrono>

CalendarDate from_timestamp(std::int64_t timestamp) {
    const auto days = std::chrono::floor<std::chrono::days>(
        std::chrono::seconds{timestamp});
    const auto date = std::chrono::year_month_day{std::chrono::sys_days{days}};
    return {int(date.year()), unsigned(date.month()), unsigned(date.day())};
}
