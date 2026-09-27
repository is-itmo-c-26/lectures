#include <cstdio>

int main() {
    char text[] = "Hello world";
    text[1] = 'E';
    std::puts(text);

    const char* literal = "Hello world";
    // literal[1] = 'E'; // Compilation error: the character is const.
    std::puts(literal);
}
