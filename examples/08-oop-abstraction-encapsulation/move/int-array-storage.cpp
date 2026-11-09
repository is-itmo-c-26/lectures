#include "int-array.hpp"
#include <cassert>

IntArray::IntArray(std::size_t size)
    : size_(size), data_(size == 0 ? nullptr : new int[size]{}) {
}

IntArray::~IntArray() {
    delete[] data_;
}

int& IntArray::at(std::size_t index) {
    assert(index < size_);
    return data_[index];
}
