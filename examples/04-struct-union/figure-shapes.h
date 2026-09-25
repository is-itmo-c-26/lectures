#pragma once

struct Point {
    float x;
    float y;
};

struct Triangle {
    Point a;
    Point b;
    Point c;
};

struct Rectangle {
    Point left_top;
    Point right_bottom;
};

struct Circle {
    Point center;
    float radius;
};
