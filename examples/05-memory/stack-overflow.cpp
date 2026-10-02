#include <iostream>

int main() {
    char buffer[16 * 1024 * 1024];  // 16 МБ при лимите стека в 8 МБ
    buffer[0] = 1;
    std::cout << static_cast<int>(buffer[0]) << '\n';

    return 0;
}
