#include <iostream>

#include "stack.hpp"

int main() {
    IntStack stack;
    stack.Push(10);
    stack.Push(20);
    std::cout << stack.Top() << '\n';
    stack.Pop();
    std::cout << stack.Top() << '\n';
}
