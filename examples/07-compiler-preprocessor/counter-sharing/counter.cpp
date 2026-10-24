#include "counter.hpp"

void IncrementCounter() {
    ++counter;
}

int* CounterAddress() {
    return &counter;
}

const int* AnswerAddress() {
    return &kAnswer;
}
