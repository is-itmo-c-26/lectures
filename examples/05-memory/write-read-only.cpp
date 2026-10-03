// Intentional undefined behavior: attempting to modify a string literal.
int main() {
    const char* text = "Read-only memory";
    volatile char* writable = const_cast<char*>(text);
    writable[0] = 'r'; // Typically faults on Linux/macOS.
}
