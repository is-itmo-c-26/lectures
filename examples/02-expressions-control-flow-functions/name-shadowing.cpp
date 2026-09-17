#include <iostream>

int x = 0;
int y = 0;

void print_local_values(double x) {
    double y = 3.14;
    std::cout << "local: x = " << x << ", y = " << y << '\n';
}

int main() {
    x = 21;
    y = 239;

    {
        int x = 10;
        std::cout << "block: x = " << x << ", y = " << y << '\n';
        print_local_values(y);
    }

    std::cout << "global: x = " << x << ", y = " << y << '\n';

    return 0;
}
