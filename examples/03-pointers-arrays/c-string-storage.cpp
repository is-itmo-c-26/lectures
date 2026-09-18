#include <iostream>

int main() {
    const char* first = "Hello world";
    char second[] = "Hello world";
    const char* third = second;

    second[0] = 'h';  // Меняем отдельный массив, а не литерал.
    std::cout << first << '\n';  // Hello world
    std::cout << third << '\n';  // hello world
}
