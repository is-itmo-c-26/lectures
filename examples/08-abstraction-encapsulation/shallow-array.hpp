#pragma once
#include <cstddef>

class ShallowArray {
public:
    explicit ShallowArray(std::size_t size) : data_(new int[size]{}) {}

    ~ShallowArray() { delete[] data_; }

private:
    int* data_;
};
