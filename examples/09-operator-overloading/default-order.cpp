#include <compare>
#include <iostream>

struct Fraction {
    int numerator;
    int denominator;
    auto operator<=>(const Fraction&) const = default;
};

int main() {
    Fraction half{1, 2}, third{1, 3};
    std::cout << std::boolalpha << (half < third) << '\n';
}
