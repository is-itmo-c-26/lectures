#include "foo-ptr.hpp"
#include <cassert>

Foo& FooPtr::operator*() const {
    assert(ptr_ != nullptr);
    return *ptr_;
}

Foo* FooPtr::operator->() const {
    assert(ptr_ != nullptr);
    return ptr_;
}
