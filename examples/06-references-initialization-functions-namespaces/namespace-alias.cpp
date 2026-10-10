#include <iostream>

namespace course::graphics {
    void draw() { std::cout << "draw\n"; }
}
namespace course::graphics {
    void clear() { std::cout << "clear\n"; }
}

int main() {
    namespace gfx = course::graphics;
    gfx::clear();
    gfx::draw();
}
