#include <iostream>

struct Point {
    int x;
    int y;
};

int main() {
    Point point{};
    point.x = 200;
    point.y = 250;

    std::cout << point.x << ' ' << point.y << '\n';

    return 0;
}
