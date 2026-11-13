#include <cstddef>

class IntArray {
public:
    explicit IntArray(std::size_t size) : data_(new int[size]{}) {}
    ~IntArray() { delete[] data_; }
    IntArray(const IntArray&) = delete;
    IntArray& operator=(const IntArray&) = delete;

private:
    int* data_;
};

int main() {
    IntArray first(10);
    IntArray second = first;
}
