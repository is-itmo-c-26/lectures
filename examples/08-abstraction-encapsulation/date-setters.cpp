#include <iostream>

class Date {
public:
    void SetYear(int year) { year_ = year; }
    void SetMonth(unsigned month) { month_ = month; }
    void SetDay(unsigned day) { day_ = day; }
    int Year() const { return year_; }
    unsigned Month() const { return month_; }
    unsigned Day() const { return day_; }

private:
    int year_ = 2024;
    unsigned month_ = 1;
    unsigned day_ = 31;
};

int main() {
    Date date;
    date.SetMonth(2);
    std::cout << date.Year() << '-' << date.Month() << '-' << date.Day()
              << '\n';
}
