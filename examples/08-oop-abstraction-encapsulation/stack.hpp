#pragma once
#include <cassert>
#include <cstddef>

class IntStack {
public:
    void push(int value) {
        assert(size_ < 10);
        data_[size_++] = value;
    }
    void pop() {
        assert(!empty());
        --size_;
    }
    int top() const {
        assert(!empty());
        return data_[size_ - 1];
    }
    bool empty() const { return size_ == 0; }
private:
    int data_[10]{};
    std::size_t size_ = 0;
};
