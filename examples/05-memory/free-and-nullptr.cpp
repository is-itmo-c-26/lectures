#include <cstdlib>
#include <print>

int main() {
    int* pointer = static_cast<int*>(std::malloc(sizeof(int)));
    if (pointer == nullptr) {
        return 1;
    }
    *pointer = 42;
    std::println("Before free: {}", *pointer);

    std::free(pointer); // Releases the block; pointer is now dangling.
    pointer = nullptr;  // Explicit assignment, not an effect of free.

    std::println("pointer == nullptr: {}", pointer == nullptr);
    std::free(pointer); // free(nullptr) does nothing.
}
