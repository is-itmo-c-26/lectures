#include "geo-point.hpp"
#include <iostream>

GeoPoint::GeoPoint() {
    std::cout << "GeoPoint default ctor: " << this << '\n';
}
GeoPoint::GeoPoint(const Rational& lat,
                         const Rational& lon)
    : latitude_(lat), longitude_(lon) {
    std::cout << "GeoPoint value ctor: " << this << '\n';
}
GeoPoint::~GeoPoint() {
    std::cout << "GeoPoint dtor: " << this << '\n';
}
