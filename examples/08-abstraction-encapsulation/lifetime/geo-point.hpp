#pragma once
#include "rational.hpp"

class GeoPoint {
public:
    GeoPoint();
    GeoPoint(const Rational& lat, const Rational& lon);
    GeoPoint(const GeoPoint& other);
    GeoPoint(GeoPoint&& other) noexcept;
    ~GeoPoint();
    GeoPoint& operator=(const GeoPoint& other);
    GeoPoint& operator=(GeoPoint&& other) noexcept;

private:
    Rational latitude_;
    Rational longitude_;
};
