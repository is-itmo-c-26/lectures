#include <iostream>

int main() {
    int item_count = 3;
    double precise_count = item_count;  // неявно

    double value = 3.75;
    int integer_part = (int)value;  // явно

    std::cout << precise_count << ' ' << integer_part << '\n';
    return 0;
}
