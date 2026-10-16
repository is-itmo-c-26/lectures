#include <iostream>

struct Point {
    int x;
    int y;
};

Point MakePoint(int x = 0, int y = 0) {
    return {x, y};
}

void Print(Point point) {
    std::cout << '(' << point.x << ", " << point.y << ")\n";
}

int main() {
    Print(MakePoint(10, 20));  // (10, 20)
    Print(MakePoint(10));      // (10, 0)
    Print(MakePoint());        // (0, 0)

    return 0;
}
