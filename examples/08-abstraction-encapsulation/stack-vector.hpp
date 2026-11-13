#pragma once
#include <cassert>
#include <vector>

class IntStack {
public:
    void Push(int value) {
        assert(data_.size() < 10);
        data_.push_back(value);
    }
    void Pop() {
        assert(!IsEmpty());
        data_.pop_back();
    }
    int Top() const {
        assert(!IsEmpty());
        return data_.back();
    }
    bool IsEmpty() const { return data_.empty(); }

private:
    std::vector<int> data_;
};
