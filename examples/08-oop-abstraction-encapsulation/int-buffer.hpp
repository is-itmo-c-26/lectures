#pragma once
#include <cstddef>
#include <iostream>

class IntBuffer {
public:
    explicit IntBuffer(std::size_t size)
        : data_(new int[size]{})
    {}

    ~IntBuffer() {
        delete[] data_;
        std::cout << "~IntBuffer\n";
    }
    IntBuffer(const IntBuffer&) = delete;
    IntBuffer& operator=(const IntBuffer&) = delete;

private:
    int* data_;
};
