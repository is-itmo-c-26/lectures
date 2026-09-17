#include <iostream>

int main() {
    unsigned int wrapped = 0U - 1U;
    int count = -1;
    unsigned int limit = 10U;

    std::cout << wrapped << '\n';
    std::cout << std::boolalpha
              << (static_cast<unsigned int>(count) < limit) << '\n';
}
