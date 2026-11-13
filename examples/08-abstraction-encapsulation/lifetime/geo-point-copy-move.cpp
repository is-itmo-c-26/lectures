#include <iostream>
#include <utility>

#include "geo-point.hpp"

GeoPoint::GeoPoint(const GeoPoint& other)
    : latitude_(other.latitude_), longitude_(other.longitude_) {
    std::cout << "GeoPoint copy ctor\n";
}

GeoPoint::GeoPoint(GeoPoint&& other) noexcept
    : latitude_(std::move(other.latitude_)),
      longitude_(std::move(other.longitude_)) {
    std::cout << "GeoPoint move ctor\n";
}
