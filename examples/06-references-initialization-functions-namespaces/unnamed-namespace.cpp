#include <iostream>

namespace {
void print_message() {
    std::cout << "Unnamed namespace function\n";
}
}  // namespace

int main() {
    print_message();

    return 0;
}
