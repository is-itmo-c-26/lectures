#include <iostream>

namespace course {
    namespace graphics {
        void draw() {
            std::cout << "draw\n";
        }
    }
}

int main() {
    course::graphics::draw();
}
