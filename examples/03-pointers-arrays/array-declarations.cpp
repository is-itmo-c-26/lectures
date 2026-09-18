#include <iostream>

int main() {
    int uninitialized[10];  // Значения элементов не определены.
    int inferred[] = {1, 2, 3, 4, 5};
    int fixed[3] = {1, 2, 3};
    int matrix[2][3] = {
        {1, 2, 3},
        {4, 5, 6},
    };

    std::cout << sizeof(uninitialized) << '\n';  // Не читаем элементы.
    std::cout << inferred[0] << ' ' << fixed[2] << '\n';
    std::cout << matrix[1][2] << '\n';
}
