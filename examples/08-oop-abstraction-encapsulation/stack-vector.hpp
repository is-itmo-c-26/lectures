#pragma once
#include <cassert>
#include <vector>

class IntStack {
public:
    void push(int value) {
        data_.push_back(value);
    }
    void pop() {
        assert(!empty());
        data_.pop_back();
    }
    int top() const {
        assert(!empty());
        return data_.back();
    }
    bool empty() const { return data_.empty(); }
private:
    std::vector<int> data_;
};
