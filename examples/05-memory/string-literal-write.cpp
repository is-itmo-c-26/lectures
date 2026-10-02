#include <iostream>

int main() {
    char* text = const_cast<char*>("Hello world");
    text[1] = 'E';  // запись в сегмент только для чтения
    std::cout << text << '\n';

    return 0;
}
