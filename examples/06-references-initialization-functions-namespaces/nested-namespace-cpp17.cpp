#include <iostream>

namespace foo::some_long_namespace_name {
void Print() {
    std::cout << "foo::some_long_namespace_name::Print\n";
}
}  // namespace foo::some_long_namespace_name

int main() {
    foo::some_long_namespace_name::Print();

    return 0;
}
