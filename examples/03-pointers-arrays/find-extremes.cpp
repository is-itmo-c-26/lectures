#include <cstddef>
#include <iostream>

int* FindByOrder(int* array, std::size_t size, bool (*comes_before)(int, int)) {
    if (size == 0) return nullptr;
    int* result = array;
    for (std::size_t index = 1; index < size; ++index) {
        if (comes_before(*result, array[index])) {
            result = &array[index];
        }
    }
    return result;
}

bool Less(int left, int right) {
    return left < right;
}

bool Greater(int left, int right) {
    return left > right;
}

int main() {
    int values[] = {1, 2, 3, 4, 5, 6, 7, 8};
    std::cout << *FindByOrder(values, 8, Less) << '\n';     // 8
    std::cout << *FindByOrder(values, 8, Greater) << '\n';  // 1
}
