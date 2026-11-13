#pragma once
#include <cassert>
#include <cstddef>
#include <vector>

class IntArray {
public:
    explicit IntArray(std::size_t size) : data_(size) {}
    std::size_t Size() const { return data_.size(); }
    int& At(std::size_t index) {
        assert(index < Size());
        return data_[index];
    }

private:
    std::vector<int> data_;
};
