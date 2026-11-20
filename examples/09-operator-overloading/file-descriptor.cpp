#include "file-descriptor.hpp"
#include <stdexcept>

FileDescriptor::FileDescriptor(const char* path, const char* mode)
    : file_(std::fopen(path, mode)) {
    if (file_ == nullptr) {
        throw std::runtime_error("cannot open file");
    }
}

FileDescriptor::~FileDescriptor() {
    std::fclose(file_);
}
