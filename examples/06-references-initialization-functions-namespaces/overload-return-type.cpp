int convert(int value) {
    return value;
}
float convert(int value) {
    return static_cast<float>(value);
}

int main() {
    return convert(10);
}
