#include "tagged-figure.h"
#include <iostream>

int main() {
    Figure figures[]{
        {FigureType::Circle, {.circle = {{0, 0}, 10}}},
        {FigureType::Rectangle, {.rectangle = {{0, 10}, {20, 0}}}},
        {FigureType::Triangle, {.triangle = {{0, 0}, {4, 0}, {0, 3}}}},
    };

    for (Figure figure : figures) {
        switch (figure.type) {
        case FigureType::Circle:
            std::cout << "Radius: "
                      << figure.data.circle.radius << '\n';
            break;
        case FigureType::Rectangle:
            std::cout << "Left x: "
                      << figure.data.rectangle.left_top.x << '\n';
            break;
        case FigureType::Triangle:
            std::cout << "Vertex A x: "
                      << figure.data.triangle.a.x << '\n';
            break;
        }
    }
}
