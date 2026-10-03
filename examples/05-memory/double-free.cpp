#include <cstdlib>

// Intentional undefined behavior.
int main() {
    void* memory = std::malloc(16);
    if (memory == nullptr) {
        return 1;
    }
    void* alias = memory;
    std::free(memory);
    std::free(alias); // The same allocation is freed twice.
}
