#include <new>
#include <print>

struct Point {
    int x;
    int y;
};

int main() {
    alignas(Point) unsigned char pool[2 * sizeof(Point)];
    Point* first = new (pool) Point{10, 20};
    Point* second = new (pool + sizeof(Point)) Point{30, 40};
    std::println("First: ({}, {}); second: ({}, {})",
                 first->x, first->y, second->x, second->y);

    // The first point is no longer needed: reuse its slot.
    first = new (pool) Point{50, 60};
    std::println("New first: ({}, {})", first->x, first->y);
    // No delete: both objects occupy the automatic buffer pool.
}
