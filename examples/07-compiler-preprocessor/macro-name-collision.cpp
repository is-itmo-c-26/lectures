#include <cmath>
#include <cstdio>

#define log(level, message) std::printf("[%s] %s\n", level, message)

int main() {
    log("INFO", "start");
    double x = std::log(2.718);  // Ошибка: макрос log ожидает два аргумента.
    return x > 0 ? 0 : 1;
}
