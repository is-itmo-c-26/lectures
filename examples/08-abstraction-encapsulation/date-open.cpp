#include <iostream>

#include "plain-date.hpp"

int main() {
    Date date = CreateDate(2023, 11, 1);
    date.day = 65;
    date.month = 100;
    date.timestamp = 10050;
    std::cout << date.year << '-' << date.month << '-' << date.day << ' '
              << date.timestamp << '\n';
}
