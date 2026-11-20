#pragma once
#include <cassert>
#include <cstddef>
#include <vector>

class IntArray {
public:
    explicit IntArray(std::size_t size) : data_(size) {}
    int& operator[](std::size_t index) {
        assert(index < data_.size());
        return data_[index];
    }
    const int& operator[](std::size_t index) const {
        assert(index < data_.size());
        return data_[index];
    }

private:
    std::vector<int> data_;
};
