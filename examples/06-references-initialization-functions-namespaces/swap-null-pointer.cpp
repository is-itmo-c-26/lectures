void SwapValues(int* left, int* right) {
    int temporary = *left;
    *left = *right;
    *right = temporary;
}

int main() {
    int value = 10;
    SwapValues(&value, nullptr);  // разыменование nullptr

    return 0;
}
