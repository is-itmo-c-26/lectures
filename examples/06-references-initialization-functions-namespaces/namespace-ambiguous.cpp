// Intentionally does not compile: unqualified call is ambiguous.
namespace screen {
    void print() {}
}
namespace file {
    void print() {}
}

int main() {
    using namespace screen;
    using namespace file;
    print(); // Error: screen::print or file::print?
}
