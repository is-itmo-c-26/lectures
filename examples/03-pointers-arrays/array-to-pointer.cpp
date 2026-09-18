#include <iostream>

void PrintFirst(const int* pointer) {
    std::cout << *pointer << '\n';
}

int main() {
    int values[] = {10, 20, 30};
    int* first = values;  // Инициализация указателя: values -> &values[0].
    PrintFirst(values);  // Аргумент функции: values -> &values[0].
    std::cout << *(values + 1) << '\n';  // В арифметике тоже нужен указатель.
    std::cout << values[0] << ' ' << *values << ' ' << *first << '\n';
}
