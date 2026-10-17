void print(const char*) {}
void print(int*) {}

int main() {
    print("hello"); // OK: const char*.
    print(nullptr); // Error: ambiguous call.
}
