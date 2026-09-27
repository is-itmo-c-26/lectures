#include <cstdint>
#include <print>

// Dangerous example: this array may exceed the thread's stack limit.
int main() {
    volatile std::uint64_t values[1048576];
    values[10] = 1;
    std::println("{}", static_cast<unsigned long long>(values[10]));
}
