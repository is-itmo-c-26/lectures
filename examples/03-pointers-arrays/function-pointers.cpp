int same(int value) {
    return value;
}

int main() {
    int (*function)(int) = same;
    int (*same_function)(int) = &same;

    return function(2) + same_function(2) == 4 ? 0 : 1;
}
