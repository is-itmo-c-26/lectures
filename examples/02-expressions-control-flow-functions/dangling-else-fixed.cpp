#include <iostream>

int main() {
    bool outer_condition = false;
    bool inner_condition = false;
    int result = 0;

    if (outer_condition) {
        if (inner_condition) {
            result = 1;
        }
    } else {
        result = 2;
    }

    std::cout << "result = " << result << '\n';

    return 0;
}
