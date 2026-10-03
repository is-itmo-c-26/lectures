#include <print>
#include <cstdlib>

int main() {
    int* values = static_cast<int*>(std::calloc(4, sizeof(int)));
    if (values == nullptr) {
        return 1;
    }

    for (int index = 0; index < 4; ++index) {
        std::println("values[{}] = {}", index, values[index]);
    }
    std::free(values);
}
