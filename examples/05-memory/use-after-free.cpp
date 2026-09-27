#include <print>

// Intentional undefined behavior. Run only with a sanitizer.
int main() {
    int* value = new int{42};
    int* alias = value;
    delete value;
    value = nullptr;
    std::println("{}", *alias); // The object no longer exists.
}
