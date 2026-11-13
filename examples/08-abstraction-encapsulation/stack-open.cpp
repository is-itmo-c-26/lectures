#include <iostream>

#include "plain-stack.hpp"

int main() {
    Stack stack;
    Push(stack, 42);
    std::cout << Top(stack) << '\n';

    stack.size = 100500;
    std::cout << stack.size << '\n';
}
