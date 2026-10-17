#include <iostream>

int& local_value() {
    int value = 20;
    return value; // Reference to a local variable.
}

int main() {
    int& result = local_value();
    std::cout << result << '\n'; // Undefined behavior.
}
