#include "date-timestamp.hpp"
#include "valid-date.hpp"
#include <chrono>
#include <stdexcept>

std::int64_t to_timestamp(int year, unsigned month, unsigned day) {
    if (!valid_date(year, month, day)) {
        throw std::invalid_argument("invalid date");
    }
    const auto date = std::chrono::year{year} / month / day;
    const auto days = std::chrono::sys_days{date}.time_since_epoch();
    return std::chrono::duration_cast<std::chrono::seconds>(days).count();
}
