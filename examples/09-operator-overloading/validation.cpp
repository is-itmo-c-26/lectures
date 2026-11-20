#include "rational-comparison.hpp"
#include "rational-io.hpp"
#include "rational-addition.hpp"
#include "file-descriptor.hpp"
#include "foo-ptr.hpp"
#include "int-array.hpp"
#include <cassert>
#include <limits>
#include <sstream>
#include <type_traits>

static_assert(!std::is_convertible_v<Rational, float>);
static_assert(!std::is_copy_constructible_v<FileDescriptor>);
static_assert(!std::is_copy_assignable_v<FileDescriptor>);
static_assert(!std::is_copy_constructible_v<FooPtr>);
static_assert(!std::is_copy_assignable_v<FooPtr>);

int main() {
    const int maximum = std::numeric_limits<int>::max();
    const int minimum = std::numeric_limits<int>::min();
    Rational half{1, 2};
    assert((half == Rational{2, 4}));
    assert((half == Rational{-2, -4}));
    assert((Rational{-1, 3} < half));
    assert((Rational{maximum, maximum - 1} > Rational{maximum - 1, maximum}));
    assert((Rational{minimum} < Rational{maximum}));
    assert(half <= half && half >= half && !(half != half));
    assert(static_cast<float>(half) == 0.5F);

    const Rational third{1, 3};
    assert((half + third == Rational{5, 6}));
    assert((half == Rational{1, 2} && third == Rational{1, 3}));
    Rational sum{half};
    assert(&(sum += third) == &sum);
    assert((sum == Rational{5, 6}));
    sum += sum;
    assert((sum == Rational{5, 3}));
    assert((half + Rational{-1, 2} == Rational{0}));
    assert((Rational{maximum, maximum - 1} + Rational{maximum, maximum - 1}
            == Rational{maximum, (maximum - 1) / 2}));
    assert((Rational{minimum, maximum} + Rational{1} == Rational{-1, maximum}));
    for (const Rational initial : {Rational{maximum}, Rational{minimum}, Rational{1, maximum}}) {
        Rational target{initial};
        const Rational rhs = initial == Rational{maximum} ? Rational{1}
                           : initial == Rational{minimum} ? Rational{-1}
                           : Rational{1, maximum - 1};
        bool sum_overflow = false;
        try {
            target += rhs;
        } catch (const std::overflow_error&) {
            sum_overflow = true;
        }
        assert(sum_overflow && target == initial);
    }

    Rational value{1, 2};
    const Rational& alias = value;
    assert(&(value = alias) == &value);
    assert(value == half);
    assert(value++ == half);
    assert((value == Rational{3, 2}));
    assert(&++value == &value);
    assert((value == Rational{5, 2}));
    Rational limit{maximum};
    bool overflow = false;
    try {
        ++limit;
    } catch (const std::overflow_error&) {
        overflow = true;
    }
    assert(overflow && limit.numerator() == maximum);

    for (const char* text : {"", "x", "1/", "1:2", "3/0", "999999999999999999999/2"}) {
        std::istringstream input{text};
        Rational parsed{7, 8};
        input >> parsed;
        assert(input.fail());
        assert((parsed == Rational{7, 8}));
    }
    std::istringstream too_large{std::to_string(minimum) + "/-1"};
    too_large >> value;
    assert(too_large.fail() && (value == Rational{5, 2}));
    std::istringstream valid{" -2 / -4 0/8"};
    assert(valid >> value);
    assert(value == half);
    assert(valid >> value);
    assert(value.numerator() == 0 && value.denominator() == 1);
    std::ostringstream output;
    assert(&(output << half) == &output && output.str() == "1/2");

    IntArray array{2};
    array[1] = 42;
    const IntArray& view = array;
    static_assert(std::is_same_v<decltype(view[1]), const int&>);
    assert(view[1] == 42);
    FooPtr pointer{new Foo};
    assert(pointer->foo() == 2025 && (*pointer).foo() == 2025);
    FooPtr empty;
    FileDescriptor source{__FILE__, "r"};
    assert(std::fgetc(static_cast<std::FILE*>(source)) == '#');
    bool open_failed = false;
    try {
        FileDescriptor missing{"", "r"};
    } catch (const std::runtime_error&) {
        open_failed = true;
    }
    assert(open_failed);
}
