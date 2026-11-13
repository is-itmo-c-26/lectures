#include "print-rational.hpp"

int main() {
    Rational first{1, 2};
    Rational second = first;  // копирующий конструктор
    Rational third;
    third = first;  // копирующее присваивание
    first = Rational{3, 4};  // присваивание временного объекта

    PrintRational(first);
    PrintRational(second);
    PrintRational(third);
}
