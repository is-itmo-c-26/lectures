#include <utility>

#include "move/int-array.hpp"

IntArray& IntArray::operator=(IntArray&& other) noexcept {
    if (this == &other) {
        return *this;
    }
    delete[] data_;
    size_ = std::exchange(other.size_, 0);
    data_ = std::exchange(other.data_, nullptr);
    return *this;
}
