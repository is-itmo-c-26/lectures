#include <iostream>

struct Point {
    int x;
    int y;
};

void PrintPoint(Point point) {
    std::cout << '(' << point.x << ", " << point.y << ")\n";
}

int main() {
    Point first{10, 20};
    Point second{200, 300};

    PrintPoint(first);
    PrintPoint(second);
}
