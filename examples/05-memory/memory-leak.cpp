#include <iostream>

// Intentional memory leak: overwriting the only pointer to the first allocation.
int main() {
    int* value = new int{42};
    std::cout << *value << '\n';
    value = new int{7}; // The address of the first allocation is lost.
    std::cout << *value << '\n';
    delete value; // Frees only the second allocation.
}
