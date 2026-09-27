#include <cstdio>

// Intentional undefined behavior. Run only with a sanitizer.
int main() {
    int* pointer = nullptr;
    {
        int local = 42;
        pointer = &local;
    }
    std::printf("%d\n", *pointer); // local's lifetime has ended.
}
