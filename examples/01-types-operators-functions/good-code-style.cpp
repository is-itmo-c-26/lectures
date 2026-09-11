int DoStuff(int number, int x) {
    int result = 0;
    for (int i = 0; i < number; i++) {
        if (i % 2 == 0) {
            result += x;
        } else {
            result -= 1;
        }
    }
    return result;
}

int main() {
    return DoStuff(5, 3) == 7 ? 0 : 1;
}
