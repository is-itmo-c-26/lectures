#include <iostream>
#include <limits>

int main() {
    std::cout << "long: [" << std::numeric_limits<long>::lowest() << ", "
              << std::numeric_limits<long>::max() << "]\n";
    std::cout << "double: [" << std::numeric_limits<double>::lowest() << ", "
              << std::numeric_limits<double>::max() << "]\n";
    std::cout << "smallest positive normalized double: " << std::numeric_limits<double>::min()
              << '\n';
    std::cout << "char is signed: " << std::numeric_limits<char>::is_signed << '\n';

    return 0;
}
