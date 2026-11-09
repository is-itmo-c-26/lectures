#include "geo-point.hpp"
#include <iostream>
#include <utility>

GeoPoint& GeoPoint::operator=(const GeoPoint& other) {
    std::cout << "GeoPoint copy assignment: " << this
              << " <- " << &other << '\n';
    latitude_ = other.latitude_;
    longitude_ = other.longitude_;
    return *this;
}
GeoPoint& GeoPoint::operator=(GeoPoint&& other) noexcept {
    std::cout << "GeoPoint move assignment: " << this
              << " <- " << &other << '\n';
    latitude_ = std::move(other.latitude_);
    longitude_ = std::move(other.longitude_);
    return *this;
}
