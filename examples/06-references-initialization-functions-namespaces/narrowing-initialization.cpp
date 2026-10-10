// Intentionally does not compile: narrowing in list-initialization.
#include <iostream>

int main() {
    double source = 3.5;
    int rounded = source; // Allowed conversion; value is 3.
    int checked{source}; // Error: narrowing conversion.
    std::cout << rounded << ' ' << checked << '\n';
}
