#include <iostream>

struct Point {
    int x;
    int y;
};

struct Rectangle {
    Point left_top;
    Point right_bottom;
};

int main() {
    Rectangle rectangle{
        .left_top = {0, 100},
        .right_bottom = {200, 0},
    };

    rectangle.left_top.x = 10;
    std::cout << rectangle.left_top.x << '\n';

    return 0;
}
