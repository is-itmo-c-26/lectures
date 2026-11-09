#include "date.hpp"
#include <iostream>
#include <stdexcept>

int main() {
    Date date{2024, 3, 31};
    try {
        date.set(2024, 4, 31);
    } catch (const std::invalid_argument&) {
        std::cout << "invalid date\n";
    }
    std::cout << date.day() << '.' << date.month() << '\n';
}
