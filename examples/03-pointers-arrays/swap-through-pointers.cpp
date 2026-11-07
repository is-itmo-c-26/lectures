#include <iostream>

void SwapValues(int* left, int* right) {
    int temporary = *left;
    *left = *right;
    *right = temporary;
}

int main() {
    int first = 1;
    int second = 2;

    SwapValues(&first, &second);
    std::cout << first << ' ' << second << '\n';

    return 0;
}
