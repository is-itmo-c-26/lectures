// Intentionally does not compile: only the return type differs.
int convert(int value) {
    return value;
}
float convert(int value) {
    return static_cast<float>(value);
}

int main() {
    return convert(10);
}
