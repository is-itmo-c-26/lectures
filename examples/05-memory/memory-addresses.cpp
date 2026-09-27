#include <cstdio>
#include <print>
#include <unistd.h>

const double pi = 3.141592653589793;
int initialized_global = 42;
int zero_initialized_global;

void some_function() {}

int main() {
    int local = 0;
    const char* text = "Hello world";

    std::println("Process ID: {}", static_cast<long>(getpid()));
    std::println("Constant: {}", static_cast<const void*>(&pi));
    std::println("Initialized global: {}", static_cast<void*>(&initialized_global));
    std::println("Zero-initialized global: {}", static_cast<void*>(&zero_initialized_global));
    std::println("String literal: {}", static_cast<const void*>(text));
    std::println("Function: {}", reinterpret_cast<void*>(&some_function));
    std::println("Local variable: {}", static_cast<void*>(&local));
    std::println("Press Enter to exit.");
    std::getchar();
}
