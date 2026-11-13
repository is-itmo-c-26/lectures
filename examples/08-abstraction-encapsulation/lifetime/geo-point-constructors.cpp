#include <iostream>

#include "geo-point.hpp"

GeoPoint::GeoPoint() { std::cout << "GeoPoint default ctor\n"; }

GeoPoint::GeoPoint(const Rational& lat, const Rational& lon)
    : latitude_(lat), longitude_(lon) {
    std::cout << "GeoPoint value ctor\n";
}

GeoPoint::~GeoPoint() { std::cout << "GeoPoint dtor\n"; }
