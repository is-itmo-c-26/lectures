// Intentionally does not compile: ambiguous overload.
void print(int) {}
void print(float) {}

int main() {
    print(20.1); // double -> int or double -> float?
}
