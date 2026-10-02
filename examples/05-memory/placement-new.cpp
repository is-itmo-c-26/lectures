#include <new>
#include <print>

struct Particle {
    int x;
    int y;
};

int main() {
    alignas(Particle) unsigned char pool[2 * sizeof(Particle)];
    Particle* first = new (pool) Particle{10, 20};
    Particle* second = new (pool + sizeof(Particle)) Particle{30, 40};
    std::println("First: ({}, {}); second: ({}, {})",
                 first->x, first->y, second->x, second->y);

    // The first particle is no longer needed: reuse its slot.
    first = new (pool) Particle{50, 60};
    std::println("New first: ({}, {})", first->x, first->y);
    // No delete: both objects occupy the automatic buffer pool.
}
