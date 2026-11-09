#pragma once
#include <cstddef>

class IntArray {
public:
    explicit IntArray(std::size_t size);
    ~IntArray();
    IntArray(const IntArray& other);
    IntArray& operator=(const IntArray& other);

    std::size_t size() const { return size_; }
    int& at(std::size_t index);

private:
    std::size_t size_;
    int* data_;
};
