#include <cassert>
#include <cstddef>
#include <iostream>

struct Stack {
    int data[10]{};
    std::size_t size = 0;
};

void push(Stack& stack, int value) {
    assert(stack.size < 10);
    stack.data[stack.size++] = value;
}

int top(const Stack& stack) {
    assert(stack.size > 0);
    return stack.data[stack.size - 1];
}

int main() {
    Stack stack;
    push(stack, 42);
    std::cout << top(stack) << '\n';
}
