#include "int-array.hpp"

IntArray& IntArray::operator=(const IntArray& other) {
    if (this == &other) {
        return *this;
    }
    int* new_data = other.size_ == 0 ? nullptr : new int[other.size_];
    for (std::size_t i = 0; i < other.size_; ++i) {
        new_data[i] = other.data_[i];
    }
    delete[] data_;
    data_ = new_data;
    size_ = other.size_;
    return *this;
}
