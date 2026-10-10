namespace example {
void (*signal(int number, void (*handler)(int)))(int);

using Handler = void (*)(int);
Handler signal(int number, Handler handler);  // То же объявление.
}  // namespace example

int main() {}
