#include <cstdint>
#include <iostream>

union Value {
    std::int64_t integer;
    double real;
    char text[16];
};

int main() {
    Value value{};
    std::cout << sizeof(value) << '\n';

    value.integer = 239;
    std::cout << value.integer << '\n';  // активен integer

    value.real = 3.14;
    std::cout << value.real << '\n';  // теперь активен real

    return 0;
}
