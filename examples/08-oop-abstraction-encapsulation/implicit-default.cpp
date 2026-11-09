#include "print-rational.hpp"

struct GeoPoint {
    Rational latitude;
    Rational longitude;
};

int main() {
    GeoPoint point;
    print_rational(point.latitude);
    print_rational(point.longitude);
}
