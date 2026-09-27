#include <cstdio>

// Intentional undefined behavior. Run only with a sanitizer.
int main() {
    int* values = new int[3]{10, 20, 30};
    int index = 3;
    std::printf("%d\n", values[index]); // Past the array boundary.
    delete[] values;
}
