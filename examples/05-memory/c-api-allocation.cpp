#include <cstdlib>
#include <print>
#include <string.h>

int main() {
    char* copy = ::strdup("Hello from a C API");
    if (copy == nullptr) {
        return 1;
    }
    std::println("{}", copy);
    std::free(copy); // strdup allocates with malloc; delete[] is invalid.
}
