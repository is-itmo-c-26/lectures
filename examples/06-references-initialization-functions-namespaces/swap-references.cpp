void swap_values(int& left, int& right) {
    int temporary = left;
    left = right;
    right = temporary;
}

int main() {
    int first = 10;
    int second = 20;
    swap_values(first, second);

    return first == 20 && second == 10 ? 0 : 1;
}
