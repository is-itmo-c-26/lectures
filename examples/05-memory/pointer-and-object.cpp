#include <print>
#include <cstdlib>

int main() {
    int local = 0;
    int* pointer = static_cast<int*>(std::malloc(sizeof(int)));
    if (pointer == nullptr) {
        return 1;
    }
    *pointer = 42;

    std::println("local: size={}, address={}", sizeof(local), static_cast<void*>(&local));
    std::println("pointer: size={}, address={}", sizeof(pointer), static_cast<void*>(&pointer));
    std::println("*pointer: size={}, address={}", sizeof(*pointer), static_cast<void*>(pointer));
    std::println("value={}", *pointer);
    std::free(pointer);
}
