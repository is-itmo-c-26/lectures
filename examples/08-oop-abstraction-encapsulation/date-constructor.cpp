#include "date.hpp"
#include "valid-date.hpp"
#include <stdexcept>

Date::Date(int year, unsigned month, unsigned day)
    : year_(year), month_(month), day_(day) {
    if (!valid_date(year_, month_, day_)) {
        throw std::invalid_argument("invalid date");
    }
}
