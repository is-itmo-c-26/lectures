#pragma once

class Rational {
public:
    Rational(int numerator = 0, int denominator = 1);
    Rational(const Rational& other);
    Rational(Rational&& other) noexcept;
    Rational& operator=(const Rational& other);
    Rational& operator=(Rational&&) = default;

    int numerator() const;
    int denominator() const;

private:
    int numerator_;
    int denominator_;
};
