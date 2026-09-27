#include <print>

// Intentional undefined behavior. Run only with a sanitizer.
int main() {
    int* pointer = nullptr;
    std::println("{}", *pointer);
}
