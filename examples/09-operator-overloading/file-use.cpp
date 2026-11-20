#include "file-descriptor.hpp"
#include <iostream>
#include <stdexcept>

int main() {
    try {
        FileDescriptor source{__FILE__, "r"};
        int first = std::fgetc(static_cast<std::FILE*>(source));
        if (first != EOF) {
            std::cout << static_cast<char>(first) << '\n';
        }
    } catch (const std::runtime_error& error) {
        std::cerr << error.what() << '\n';
        return 1;
    }
}
