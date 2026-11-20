#include "multiplier.hpp"
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    const Multiplier twice{2};
    std::cout << twice(3) << '\n';

    std::vector<int> data{1, 2, 3, 4, 5};
    std::transform(data.begin(), data.end(), data.begin(), Multiplier{5});
    for (int value : data) {
        std::cout << value << ' ';
    }
    std::cout << '\n';
}
