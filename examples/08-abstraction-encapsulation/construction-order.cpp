#include <utility>

#include "lifetime/geo-point.hpp"

int main() {
    GeoPoint first;
    const Rational latitude{1, 2};
    const Rational longitude{3, 4};
    GeoPoint second{latitude, longitude};
    GeoPoint third{second};
    GeoPoint fourth{std::move(second)};
    first = third;
    third = std::move(fourth);
}
