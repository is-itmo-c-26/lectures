#include <iostream>

#include "counter.hpp"

void IncrementCounter();
int* CounterAddress();
const int* AnswerAddress();

int main() {
    IncrementCounter();
    std::cout << std::boolalpha;
    std::cout << counter << ' ' << *CounterAddress() << ' '
              << (&counter == CounterAddress()) << '\n';
    std::cout << kAnswer << ' ' << *AnswerAddress() << ' '
              << (&kAnswer == AnswerAddress()) << '\n';

    return 0;
}
