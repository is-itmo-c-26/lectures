#include "plain-date.hpp"
#include <iostream>

int main() {
    Date date = create_date(2023, 11, 1);
    date.day = 65;
    date.month = 100;
    date.timestamp = 10050;
    std::cout << date.year << '-' << date.month << '-' << date.day
              << ' ' << date.timestamp << '\n';
}
