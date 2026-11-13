#include "plain-stack.hpp"

#include <cassert>

void Push(Stack& stack, int value) {
    assert(stack.size < 10);
    stack.data[stack.size++] = value;
}

int Top(const Stack& stack) {
    assert(stack.size > 0);
    return stack.data[stack.size - 1];
}
