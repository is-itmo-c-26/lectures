#include <iostream>
#include <vector>

void PrintVector(const std::vector<int>& values, char delimiter = ' ') {
    for (int value : values) {
        std::cout << value << delimiter;
    }
    std::cout << '\n';
}

int main() {
    std::vector<int> values{1, 2, 3, 4, 5};
    PrintVector(values);       // 1 2 3 4 5
    PrintVector(values, ',');  // 1,2,3,4,5,

    return 0;
}
