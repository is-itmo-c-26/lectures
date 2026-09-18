#include <iostream>

void swap_values(int* left, int* right) {
    int temporary = *left;
    *left = *right;
    *right = temporary;
}

int main() {
    int first = 1;
    int second = 2;

    swap_values(&first, &second);
    std::cout << first << ' ' << second << '\n';

    return 0;
}
