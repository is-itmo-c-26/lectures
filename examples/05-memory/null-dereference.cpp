#include <cstdio>

// Intentional undefined behavior. Run only with a sanitizer.
int main() {
    int* pointer = nullptr;
    std::printf("%d\n", *pointer);
}
