#include <cstring>
#include <iostream>

int main() {
    const char raw[3] = {'C', '+', '+'};  // Нет завершающего '\0'.
    const char text[4] = "C++";          // Есть место для '\0'.

    std::cout << sizeof(raw) << '\n';        // 3
    std::cout << sizeof(text) << '\n';       // 4
    std::cout << std::strlen(text) << '\n';  // 3
    // std::cout << std::strlen(raw);  // Неопределённое поведение.
}
