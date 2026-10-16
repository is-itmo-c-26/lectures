#include <iostream>

namespace {
void PrintMessage() {
    std::cout << "Unnamed namespace function\n";
}
}  // namespace

int main() {
    PrintMessage();

    return 0;
}
