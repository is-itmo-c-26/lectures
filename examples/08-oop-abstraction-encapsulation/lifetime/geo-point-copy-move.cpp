#include "geo-point.hpp"
#include <iostream>
#include <utility>

GeoPoint::GeoPoint(const GeoPoint& other)
    : latitude_(other.latitude_), longitude_(other.longitude_) {
    std::cout << "GeoPoint copy ctor: " << this
              << " <- " << &other << '\n';
}
GeoPoint::GeoPoint(GeoPoint&& other) noexcept
    : latitude_(std::move(other.latitude_)),
      longitude_(std::move(other.longitude_)) {
    std::cout << "GeoPoint move ctor: " << this
              << " <- " << &other << '\n';
}
