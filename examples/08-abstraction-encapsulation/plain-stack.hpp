#pragma once
#include <cstddef>

struct Stack {
    int data[10]{};
    std::size_t size = 0;
};

void Push(Stack& stack, int value);
int Top(const Stack& stack);
