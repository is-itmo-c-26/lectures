class Rational {
public:
    int numerator() const {
        denominator_ = 1;
        return numerator_;
    }

private:
    int numerator_ = 1;
    int denominator_ = 2;
};

int main() {
    const Rational number;
    return number.numerator();
}
