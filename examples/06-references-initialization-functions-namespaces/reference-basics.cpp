#include <iostream>

int main() {
    int i = 10;
    int& j = i;  // j — второе имя i
    // int& k;   // error: declaration of reference variable 'k' requires an initializer

    j = 20;  // присваивание i, а не перепривязка ссылки
    std::cout << i << '\n';
    std::cout << &i << ' ' << &j << '\n';

    const int& r = i;
    // r = 21;  // error: cannot assign to variable 'r' with const-qualified type
    std::cout << r << '\n';

    return 0;
}
