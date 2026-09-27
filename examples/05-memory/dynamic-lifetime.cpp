#include <cstdio>

int* make_value() {
    int* value = new int{42};
    return value;
}

int main() {
    int* value = make_value();
    std::printf("%d\n", *value);
    delete value;
}
