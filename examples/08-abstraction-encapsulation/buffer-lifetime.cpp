#include <iostream>

#include "int-buffer.hpp"

int main() {
    {
        IntBuffer buffer{10};
        std::cout << "inside block\n";
    }
    std::cout << "after block\n";
}
