#include <iostream>

namespace foo {
namespace some_long_namespace_name {
void Print() {
    std::cout << "foo::some_long_namespace_name::Print\n";
}
}  // namespace some_long_namespace_name
}  // namespace foo

int main() {
    foo::some_long_namespace_name::Print();

    namespace sn = foo::some_long_namespace_name;
    sn::Print();

    return 0;
}
