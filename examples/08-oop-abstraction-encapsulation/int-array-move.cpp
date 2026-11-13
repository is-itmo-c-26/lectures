#include "move/int-array.hpp"
#include <utility>

IntArray::IntArray(IntArray&& other) noexcept
    : size_(std::exchange(other.size_, 0)),
      data_(std::exchange(other.data_, nullptr)) {
}
