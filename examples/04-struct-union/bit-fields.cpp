#include <iostream>

struct Flags {
    unsigned visible : 1;
    unsigned enabled : 1;
    unsigned level : 4;  // значения 0..15
};

int main() {
    Flags flags{.visible = 1, .enabled = 0, .level = 9};

    std::cout << sizeof(Flags) << '\n';
    std::cout << flags.level << '\n';

    flags.level += 7;  // 16 не помещается в 4 бита: остаётся 0
    std::cout << flags.level << '\n';

    return 0;
}
