#include <iostream>

int main() {
    int values[] = {10, 20, 30};
    int* pointer = values;

    int first = *pointer;         // 10
    int second = *(pointer + 1);  // 20
    int third = pointer[2];       // 30
    std::cout << first << ' ' << second << ' ' << third << '\n';
}
