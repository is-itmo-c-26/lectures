#include <iostream>
#include <string>

void PrintSquare(const int& value) {
    std::cout << value * value << '\n';
}

void Greet(const std::string& name) {
    std::cout << "Hello, " << name << "!\n";
}

int main() {
    PrintSquare(5);  // временный int со значением 5
    Greet("world");  // временная std::string из "world"

    return 0;
}
