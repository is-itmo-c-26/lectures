#include <iostream>

void print(int*) {
    std::cout << "print(int*)\n";
}

void print(int) {
    std::cout << "print(int)\n";
}

int main() {
    print(nullptr);
    print(0);

    // print(NULL); // Может быть неоднозначно: NULL обычно является макросом.

    return 0;
}
