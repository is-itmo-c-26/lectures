#include "int-array.hpp"

IntArray::IntArray(std::size_t size)
    : size_(size), data_(size == 0 ? nullptr : new int[size]{}) {}

IntArray::~IntArray() { delete[] data_; }
