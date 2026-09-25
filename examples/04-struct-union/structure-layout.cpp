#include <cstddef>
#include <cstdint>
#include <cstdio>

struct PoorLayout {
    char a;
    std::int64_t b;
    char c;
};

struct CompactLayout {
    std::int64_t b;
    char a;
    char c;
};

int main() {
    std::printf("           size align offset(b)\n");
    std::printf("Poor:      %zu   %zu     %zu\n",
        sizeof(PoorLayout), alignof(PoorLayout), offsetof(PoorLayout, b));
    std::printf("Compact:   %zu   %zu     %zu\n",
        sizeof(CompactLayout), alignof(CompactLayout), offsetof(CompactLayout, b));
}
