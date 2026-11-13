#pragma once
#include <iostream>

class Trace {
public:
    explicit Trace(const char* name) : name_(name) {
        std::cout << "+ " << name_ << '\n';
    }
    ~Trace() { std::cout << "- " << name_ << '\n'; }

private:
    const char* name_;
};
