#include <stdexcept>

#include "date.hpp"
#include "valid-date.hpp"

Date::Date(int year, unsigned month, unsigned day)
    : year_(year), month_(month), day_(day) {
    if (!IsValidDate(year_, month_, day_)) {
        throw std::invalid_argument("invalid date");
    }
}
