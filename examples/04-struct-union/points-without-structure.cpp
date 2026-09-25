#include <iostream>

void PrintPoint(int x, int y) {
    std::cout << '(' << x << ", " << y << ")\n";
}

int main() {
    int first_x = 10;
    int first_y = 20;
    int second_x = 200;
    int second_y = 300;

    PrintPoint(first_x, first_y);
    PrintPoint(second_x, second_y);
    PrintPoint(first_x, second_y); // Смешали координаты разных точек.
}
