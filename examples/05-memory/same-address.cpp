#include <chrono>
#include <iostream>
#include <thread>

int value = 0;

int main() {
    std::cin >> value;

    while (true) {
        std::cout << &value << " = " << value << std::endl;
        std::this_thread::sleep_for(std::chrono::seconds(5));
    }
}
