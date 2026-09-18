#include <iostream>

int main() {
    int values[] = {10, 20, 30};
    int* begin = values;
    int* end = values + 3;  // Позиция после последнего элемента.

    for (int* current = begin; current != end; ++current) {
        std::cout << *current << '\n';
    }
}
