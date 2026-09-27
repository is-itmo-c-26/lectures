int test(int value) {
    return value;
}

float test(float value) {
    return value;
}

int main() {
    return test(10.2F) == 10.2F ? 0 : 1;
}
