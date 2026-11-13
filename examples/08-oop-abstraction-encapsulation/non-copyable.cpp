#include <type_traits>

class NonCopyable {
public:
    NonCopyable(const NonCopyable&) = delete;
    NonCopyable& operator=(const NonCopyable&) = delete;
protected:
    NonCopyable() = default;
    ~NonCopyable() = default;
};

class CantCopy : private NonCopyable {};

static_assert(!std::is_copy_constructible_v<CantCopy>);
static_assert(!std::is_copy_assignable_v<CantCopy>);

int main() {
    CantCopy value;
    static_cast<void>(value);
}
