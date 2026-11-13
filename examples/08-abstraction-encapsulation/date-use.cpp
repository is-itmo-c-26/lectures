#include <iostream>

#include "date.hpp"

int main() {
    Date date{2023, 11, 1};
    std::cout << date.Year() << '-' << date.Month() << '-' << date.Day() << ' '
              << date.Timestamp() << '\n';
    date.Set(2023, 11, 2);
    std::cout << date.Year() << '-' << date.Month() << '-' << date.Day() << ' '
              << date.Timestamp() << '\n';
}
