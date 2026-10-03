#include <print>

// Intentional undefined behavior.
int main() {
    int* values = new int[3]{10, 20, 30};
    int index = 3;
    std::println("{}", values[index]); // Past the array boundary.
    delete[] values;
}
