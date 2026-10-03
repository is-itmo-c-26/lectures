#include <print>

// Intentional undefined behavior.
int main() {
    int* pointer = nullptr;
    std::println("{}", *pointer);
}
