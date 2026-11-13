#include "rational.hpp"

class GeoPoint {
public:
    GeoPoint(const Rational& lat, const Rational& lon)
        : latitude(lat), longitude(lon) {}

    Rational latitude;
    Rational longitude;
};

int main() { GeoPoint point; }
