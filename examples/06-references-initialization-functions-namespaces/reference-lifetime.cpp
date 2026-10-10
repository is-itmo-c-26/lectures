#include <iostream>
#include <string>

int main() {
    const std::string& text = std::string("hello");
    std::cout << text << '\n';
} // The temporary string lives until the end of this block.
