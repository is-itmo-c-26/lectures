#include "print-rational.hpp"

class GeoPoint {
public:
    GeoPoint() = default;
    GeoPoint(const Rational& lat, const Rational& lon)
        : latitude(lat), longitude(lon) {}

    Rational latitude;
    Rational longitude;
};

int main() {
    GeoPoint point;
    PrintRational(point.latitude);
    PrintRational(point.longitude);
}
