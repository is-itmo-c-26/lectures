#include <cstdio>
#include <new>

int main() {
    alignas(int) unsigned char storage[sizeof(int)];
    int* value = new (storage) int{42};
    std::printf("%d\n", *value);
    // No delete: storage is an automatic buffer.
}
