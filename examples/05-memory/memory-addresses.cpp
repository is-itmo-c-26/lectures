#include <cstdio>
#include <unistd.h>

const double pi = 3.141592653589793;
int initialized_global = 42;
int zero_initialized_global;

void some_function() {}

int main() {
    int local = 0;
    const char* text = "Hello world";

    std::printf("Process ID: %ld\n", static_cast<long>(getpid()));
    std::printf("Constant: %p\n", static_cast<const void*>(&pi));
    std::printf("Initialized global: %p\n", static_cast<void*>(&initialized_global));
    std::printf("Zero-initialized global: %p\n", static_cast<void*>(&zero_initialized_global));
    std::printf("String literal: %p\n", static_cast<const void*>(text));
    std::printf("Function: %p\n", reinterpret_cast<void*>(&some_function));
    std::printf("Local variable: %p\n", static_cast<void*>(&local));
    std::puts("Press Enter to exit.");
    std::getchar();
}
