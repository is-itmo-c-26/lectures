#pragma once
#include "figure-shapes.h"

enum class FigureType {
    Triangle,
    Rectangle,
    Circle,
};

union FigureData {
    Triangle triangle;
    Rectangle rectangle;
    Circle circle;
};

struct Figure {
    FigureType type;
    FigureData data;
};
