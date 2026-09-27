int main() {
    int* value = new int;
    delete value;

    int* array = new int[10];
    delete[] array;

    return 0;
}
