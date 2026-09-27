#include <print>
#include <new>

int main() {
    alignas(int) unsigned char storage[sizeof(int)];
    int* value = new (storage) int{42};
    std::println("{}", *value);
    // No delete: storage is an automatic buffer.
}
