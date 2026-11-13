#include <cassert>

#include "int-array.hpp"

int& IntArray::At(std::size_t index) {
    assert(index < size_);
    return data_[index];
}
