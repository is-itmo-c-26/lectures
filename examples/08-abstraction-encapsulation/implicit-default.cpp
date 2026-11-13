#include "print-rational.hpp"

class GeoPoint {
public:
    Rational latitude;
    Rational longitude;
};

int main() {
    GeoPoint point;
    PrintRational(point.latitude);
    PrintRational(point.longitude);
}
