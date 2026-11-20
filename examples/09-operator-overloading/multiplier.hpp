#pragma once

class Multiplier {
public:
    explicit Multiplier(int factor) : factor_(factor) {}

    int operator()(int value) const {
        return factor_ * value;
    }

private:
    int factor_;
};
