#include <cstdlib>

#include "trace.hpp"

int main() {
    Trace* object = new Trace{"object"};
    delete object;

    void* memory = std::malloc(sizeof(Trace));
    std::free(memory);
}
