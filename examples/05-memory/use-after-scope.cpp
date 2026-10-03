#include <print>

// Intentional undefined behavior.
int main() {
    int* pointer = nullptr;
    {
        int local = 42;
        pointer = &local;
    }
    std::println("{}", *pointer); // local's lifetime has ended.
}
