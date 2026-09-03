#include <iostream>

int main(int argc, char* argv[]) {
    for (int index = 0; index < argc; ++index) {
        std::cout << argv[index] << '\n';
    }

    return 0;
}
