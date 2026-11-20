#include "foo-ptr.hpp"
#include <iostream>

int main() {
    FooPtr pointer{new Foo};
    std::cout << pointer->foo() << '\n';
    std::cout << (*pointer).foo() << '\n';
}
