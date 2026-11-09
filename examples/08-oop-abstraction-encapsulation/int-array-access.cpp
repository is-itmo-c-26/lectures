#include "int-array.hpp"
#include <cassert>

int& IntArray::at(std::size_t index) {
    assert(index < size_);
    return data_[index];
}
