#include "date-alternative.hpp"
#include <iostream>

int main() {
    Date date{2023, 11, 1};
    std::cout << date.year() << '-' << date.month() << '-' << date.day()
              << ' ' << date.timestamp() << '\n';
    date.set(2023, 11, 2);
    std::cout << date.year() << '-' << date.month() << '-' << date.day()
              << ' ' << date.timestamp() << '\n';
}
