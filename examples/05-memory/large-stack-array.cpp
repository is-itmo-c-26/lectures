#include <cstdint>
#include <cstdio>

// Dangerous example: this array may exceed the thread's stack limit.
int main() {
    volatile std::uint64_t values[1048576];
    values[10] = 1;
    std::printf("%llu\n", static_cast<unsigned long long>(values[10]));
}
