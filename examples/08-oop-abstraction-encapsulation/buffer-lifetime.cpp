#include "int-buffer.hpp"
#include <iostream>

int main() {
    {
        IntBuffer buffer{10};
        std::cout << "inside block\n";
    }
    std::cout << "after block\n";
}
