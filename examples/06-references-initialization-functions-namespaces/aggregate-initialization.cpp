#include <iostream>

struct Point {
    int x;
    int y;
};
struct Circle {
    Point center;
    int radius;
};

int main() {
    Circle circle{{1, 2}, 3};
    std::cout << circle.center.x << ' ' << circle.center.y
              << ' ' << circle.radius << '\n'; // 1 2 3
}
