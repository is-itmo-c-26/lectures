#include <cstdio>

#define LOG(level, format, ...) \
    std::printf("[" level "] (%s:%d) " format "\n", \
                __FILE__, __LINE__ __VA_OPT__(, ) __VA_ARGS__)
#define LOG_ERROR(...) LOG("ERROR", __VA_ARGS__)
#define LOG_INFO(...) LOG("INFO", __VA_ARGS__)

int main() {
    LOG_INFO("started");
    LOG_ERROR("error code: %d", 1);

    return 0;
}
