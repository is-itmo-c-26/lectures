#pragma once
#include "normalize-rational.hpp"

class Rational {
public:
    explicit Rational(int numerator = 0, int denominator = 1)
        : numerator_(numerator), denominator_(denominator) {
        normalize_rational(numerator_, denominator_);
    }
    Rational(const Rational&) = default;
    Rational& operator=(const Rational& other);
    Rational& operator+=(const Rational& rhs);
    Rational& operator++();
    Rational operator++(int);
    explicit operator float() const {
        return static_cast<float>(numerator_) / denominator_;
    }

    int numerator() const { return numerator_; }
    int denominator() const { return denominator_; }

private:
    int numerator_;
    int denominator_;
};
