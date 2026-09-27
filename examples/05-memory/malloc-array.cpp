#include <cstdio>
#include <cstdlib>

int main() {
    int* values = static_cast<int*>(std::malloc(4 * sizeof(int)));
    if (values == nullptr) {
        return 1;
    }

    for (int index = 0; index < 4; ++index) {
        values[index] = index * index;
        std::printf("values[%d] = %d\n", index, values[index]);
    }
    std::free(values);
}
