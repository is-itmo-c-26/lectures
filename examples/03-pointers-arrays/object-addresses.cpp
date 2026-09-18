#include <iostream>

int main() {
    int i = 10;
    int j = 12;
    long l = 128L;
    float f = 129.1f;

    std::cout << &i << std::endl;
    std::cout << &j << std::endl;
    std::cout << &l << std::endl;
    std::cout << &f << std::endl;

    return 0;
}
