#include <iostream>

int main() {
    int value = 239;
    int* typed_pointer = &value;
    void* untyped_pointer = typed_pointer;
    int* restored_pointer = static_cast<int*>(untyped_pointer);

    std::cout << *restored_pointer << '\n';  // 239
}
