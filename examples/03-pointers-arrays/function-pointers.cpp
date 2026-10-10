int Same(int value) {
    return value;
}

int main() {
    int (*function)(int) = Same;
    int (*same_function)(int) = &Same;

    return function(2) + same_function(2) == 4 ? 0 : 1;
}
