#include <print>

int main() {
    char text[] = "Hello world";
    text[1] = 'E';
    std::println("{}", text);

    const char* literal = "Hello world";
    // literal[1] = 'E'; // Compilation error: the character is const.
    std::println("{}", literal);
}
