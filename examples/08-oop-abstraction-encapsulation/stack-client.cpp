#include "stack.hpp"
#include <iostream>

int main() {
    IntStack stack;
    stack.push(10);
    stack.push(20);
    std::cout << stack.top() << '\n';
    stack.pop();
    std::cout << stack.top() << '\n';
}
