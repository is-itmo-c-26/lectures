#include "print-rational.hpp"

struct GeoPoint {
    GeoPoint() = default;
    GeoPoint(const Rational& lat, const Rational& lon)
        : latitude(lat), longitude(lon) {
    }

    Rational latitude;
    Rational longitude;
};

int main() {
    GeoPoint point;
    print_rational(point.latitude);
    print_rational(point.longitude);
}
