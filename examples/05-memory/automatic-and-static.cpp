#include <cstdio>

void visit() {
    int automatic_count = 0;
    static int static_count = 0;
    ++automatic_count;
    ++static_count;
    std::printf("%d %d\n", automatic_count, static_count);
}

int main() {
    visit();
    visit();
}
