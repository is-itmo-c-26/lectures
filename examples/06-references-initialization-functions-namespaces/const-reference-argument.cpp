#include <iostream>
#include <string>

void greet(const std::string& name) {
    std::cout << "Hello, " << name << "!\n";
}

int main() {
    greet("world"); // A temporary std::string is created for this call.
} // The temporary has already been destroyed after the call expression.
