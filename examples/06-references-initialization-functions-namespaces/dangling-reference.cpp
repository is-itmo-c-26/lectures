#include <iostream>

int& Foo() {
    int i = 20;
    return i;
}

int Boo() {
    int i = 2;
    return i;
}

int main() {
    int& x = Foo();
    Boo();

    std::cout << x << '\n';
    return 0;
}
