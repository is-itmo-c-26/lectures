#include <cstdio>

#ifdef DEBUG
#define ERROR_LOG(format, ...)                      \
    std::printf("[ERROR] (%s:%d) " format "\n",     \
                __FILE__, __LINE__ __VA_OPT__(, ) __VA_ARGS__)
#else
#define ERROR_LOG(format, ...)
#endif

int main() {
    ERROR_LOG("fatal error no: %d", 1);

    return 0;
}
