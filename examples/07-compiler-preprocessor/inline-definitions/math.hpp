#pragma once

inline int calls = 0;

inline int Add(int a, int b) {
    ++calls;
    return a + b;
}
