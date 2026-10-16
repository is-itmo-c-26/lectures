#include <iostream>

namespace foo {
void Print() {
    std::cout << "foo\n";
}
}  // namespace foo

namespace boo {
void Print() {
    std::cout << "boo\n";
}
}  // namespace boo

int main() {
    foo::Print();
    boo::Print();

    return 0;
}
