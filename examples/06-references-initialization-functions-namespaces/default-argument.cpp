#include <iostream>
#include <vector>

void print_vector(const std::vector<int>& data, char delimiter = ',') {
    for (int value : data) {
        std::cout << value << delimiter;
    }
    std::cout << '\n';
}

int main() {
    std::vector<int> values{1, 2, 3, 4, 5};
    print_vector(values);

    return 0;
}
