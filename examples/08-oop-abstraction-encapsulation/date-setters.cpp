#include <iostream>

class Date {
public:
    void set_year(int year) { year_ = year; }
    void set_month(unsigned month) { month_ = month; }
    void set_day(unsigned day) { day_ = day; }
    int year() const { return year_; }
    unsigned month() const { return month_; }
    unsigned day() const { return day_; }
private:
    int year_ = 2024;
    unsigned month_ = 3;
    unsigned day_ = 31;
};

int main() {
    Date date;
    date.set_month(4);
    std::cout << date.year() << '-' << date.month() << '-' << date.day() << '\n';
}
