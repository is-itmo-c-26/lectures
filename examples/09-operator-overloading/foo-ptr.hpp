#pragma once
#include "foo.hpp"

class FooPtr {
public:
    explicit FooPtr(Foo* ptr = nullptr) : ptr_(ptr) {}
    ~FooPtr() { delete ptr_; }
    FooPtr(const FooPtr&) = delete;
    FooPtr& operator=(const FooPtr&) = delete;

    Foo& operator*() const;
    Foo* operator->() const;

private:
    Foo* ptr_;
};
