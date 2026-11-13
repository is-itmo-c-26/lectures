#include "trace.hpp"
#include <cstdlib>

int main() {
    Trace* object = new Trace{"object"};
    delete object;

    void* memory = std::malloc(sizeof(Trace));
    std::free(memory);
}
