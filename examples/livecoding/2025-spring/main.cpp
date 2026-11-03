#include <iostream>
#include <ctime>

enum EEventPriority : uint8_t {
    MINOR = 0,
    MIDLE,
    MAJOR
};

struct EventKey {
    EEventPriority priority;
    std::time_t    timestamp;
};


// TODO: implement
class EventStorage {

};


int main(int, char**){
    EventStorage storage;

    // O(log(n))
    storage.AddEvent(
        {MAJOR, std::time(NULL) - 1}, "First Major Event"
    );

    storage.AddEvent(
        {MAJOR, std::time(NULL)}, "Second Major Event"
    );

    storage.AddEvent(
        {MINOR, std::time(NULL)}, "Minor Event");


    auto event = storage.FindEvent(EventKey{MAJOR, std::time(NULL) - 1});
    if(event)
        std::cout << *event; //  "First Major Event"

    // O(1)
    // Prints "Minor Event"
    std::cout << storage.LowestEvent();

    // O(1)
    // Prints "Second Major Event"
    std::cout << storage.HighestEvent();

    // O(1)
    storage.RemoveEvent(EventKey{MAJOR, std::time(NULL)});

    // O(1)
    storage.RemoveEvent(EventKey{MINOR, std::time(NULL)});

    // Both
    // O(1)
    // Prints "Second Major Event"
    std::cout << storage.LowestEvent();
    std::cout << storage.HighestEvent();

    return 0;
}
