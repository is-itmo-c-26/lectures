// Dangerous example: dereferencing nullptr is undefined behavior.
void swap_values(int* left, int* right) {
    int temporary = *left;
    *left = *right;
    *right = temporary;
}

int main() {
    int value = 10;
    swap_values(&value, nullptr);
}
