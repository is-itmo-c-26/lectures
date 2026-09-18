#include <iostream>

void Print(int*) {
    std::cout << "Print(int*)\n";
}

void Print(int) {
    std::cout << "Print(int)\n";
}

int main() {
    Print(nullptr);
    Print(0);

    // Print(NULL); // Может быть неоднозначно: NULL обычно является макросом.

    return 0;
}
