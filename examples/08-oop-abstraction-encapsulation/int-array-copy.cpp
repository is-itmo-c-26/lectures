#include "int-array.hpp"

IntArray::IntArray(const IntArray& other)
    : size_(other.size_), data_(size_ == 0 ? nullptr : new int[size_]) {
    for (std::size_t i = 0; i < size_; ++i) {
        data_[i] = other.data_[i];
    }
}
