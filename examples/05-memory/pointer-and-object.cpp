#include <cstdio>
#include <cstdlib>

int main() {
    int local = 0;
    int* pointer = static_cast<int*>(std::malloc(sizeof(int)));
    if (pointer == nullptr) {
        return 1;
    }
    *pointer = 42;

    std::printf("local: size=%zu, address=%p\n", sizeof(local), static_cast<void*>(&local));
    std::printf("pointer: size=%zu, address=%p\n", sizeof(pointer), static_cast<void*>(&pointer));
    std::printf("*pointer: size=%zu, address=%p\n", sizeof(*pointer), static_cast<void*>(pointer));
    std::printf("value=%d\n", *pointer);
    std::free(pointer);
}
