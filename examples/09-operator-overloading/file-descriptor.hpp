#pragma once
#include <cstdio>

class FileDescriptor {
public:
    explicit FileDescriptor(const char* path, const char* mode);
    ~FileDescriptor();
    FileDescriptor(const FileDescriptor&) = delete;
    FileDescriptor& operator=(const FileDescriptor&) = delete;

    explicit operator std::FILE*() const { return file_; }

private:
    std::FILE* file_;
};
