#include "lifetime/geo-point.hpp"
#include <utility>

int main() {
    GeoPoint first;
    const Rational latitude{1, 2}, longitude{3, 4};
    GeoPoint second{latitude, longitude};
    GeoPoint third{second};
    GeoPoint fourth{std::move(second)};
    first = third;
    third = std::move(fourth);
}
