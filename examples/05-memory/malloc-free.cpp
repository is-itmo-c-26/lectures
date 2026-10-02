#include <cstdlib>
#include <iostream>

int main() {
    int* numbers = static_cast<int*>(std::malloc(4 * sizeof(int)));
    if (numbers == nullptr) {
        return 1;
    }

    for (int index = 0; index < 4; ++index) {
        numbers[index] = index * index;
    }
    std::cout << numbers[3] << '\n';

    std::free(numbers);

    return 0;
}
