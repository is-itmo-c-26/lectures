#include <iostream>

struct Point {
    int x;
    int y;
};

Point MakePoint(int x, int y) {
    return Point{.x = x, .y = y};
}

Point Add(Point left, Point right) {
    return Point{
        .x = left.x + right.x,
        .y = left.y + right.y,
    };
}

int main() {
    Point first = MakePoint(239, 1);
    Point second{1, 2};
    Point sum = Add(first, second);

    std::cout << sum.x << ' ' << sum.y << '\n';

    return 0;
}
