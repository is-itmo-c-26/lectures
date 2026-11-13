#pragma once

class Rational {
public:
    Rational();
    Rational(int numerator, int denominator = 1);
    Rational(const Rational& other);
    Rational(Rational&& other) noexcept;
    ~Rational();
    Rational& operator=(const Rational& other);
    Rational& operator=(Rational&& other) noexcept;

private:
    int numerator_;
    int denominator_;
};
