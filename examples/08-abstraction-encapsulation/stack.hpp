#pragma once
#include <cassert>
#include <cstddef>

class IntStack {
public:
    void Push(int value) {
        assert(size_ < 10);
        data_[size_++] = value;
    }
    void Pop() {
        assert(!IsEmpty());
        --size_;
    }
    int Top() const {
        assert(!IsEmpty());
        return data_[size_ - 1];
    }
    bool IsEmpty() const { return size_ == 0; }

private:
    int data_[10]{};
    std::size_t size_ = 0;
};
