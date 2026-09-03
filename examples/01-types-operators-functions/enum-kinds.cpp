enum Color { kRed, kGreen, kBlue };
enum class Direction { kLeft, kRight };

int main() {
    int color_code = kBlue;
    Direction direction = Direction::kLeft;
    return color_code == 2 && direction == Direction::kLeft ? 0 : 1;
}
