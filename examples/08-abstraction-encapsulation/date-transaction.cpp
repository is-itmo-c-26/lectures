#include <iostream>
#include <stdexcept>

#include "date.hpp"

int main() {
    Date date{2024, 3, 31};
    try {
        date.Set(2024, 4, 31);
    } catch (const std::invalid_argument&) {
        std::cout << "invalid date\n";
    }
    std::cout << date.Day() << '.' << date.Month() << '\n';
}
