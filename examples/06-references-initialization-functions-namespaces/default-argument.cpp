#include <iostream>

struct Point {
    int x;
    int y;
};

Point make_point(int x = 0, int y = 0) {
    return {x, y};
}

void print(Point point) {
    std::cout << '(' << point.x << ", " << point.y << ")\n";
}

int main() {
    print(make_point(10, 20)); // (10, 20)
    print(make_point(10));     // (10, 0)
    print(make_point());       // (0, 0)
}
