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

int main() {
    int values[] = {3, 1, 4};
    std::cout << *FindByOrder(values, 3, Less) << '\n';  // 4
    std::cout << (FindByOrder(values, 0, Less) == nullptr) << '\n';  // 1
}
