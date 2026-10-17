#include <print>

int* make_value() {
    int* value = new int{42};
    return value;
}

int main() {
    int* value = make_value();
    std::println("{}", *value);
    delete value;
}
