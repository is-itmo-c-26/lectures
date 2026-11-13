cmake_minimum_required(VERSION 3.16)
project(abstraction_encapsulation LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

if(CMAKE_CXX_COMPILER_ID MATCHES "Clang|GNU")
    add_compile_options(-Wall -Wextra -pedantic)
endif()

add_library(plain-stack plain-stack.cpp)
add_library(date-calendar date-to-timestamp.cpp date-from-timestamp.cpp)
add_library(plain-date create-date.cpp)
target_link_libraries(plain-date PUBLIC date-calendar)
add_library(date date-constructor.cpp date-set.cpp date-access.cpp)
target_link_libraries(date PUBLIC date-calendar)
add_library(date-alternative date-alternative.cpp date-alternative-access.cpp)
target_link_libraries(date-alternative PUBLIC date-calendar)
add_library(rational-constructors-demo
    rational-constructor.cpp
    rational-copy-constructor.cpp
    rational-move-constructor.cpp
    rational-copy-assignment.cpp
    rational-methods.cpp
)
add_library(int-array
    int-array-lifetime.cpp
    int-array-access.cpp
    int-array-copy.cpp
    int-array-copy-assignment.cpp
)
add_library(moving-int-array
    move/int-array-storage.cpp
    int-array-move.cpp
    int-array-move-assignment.cpp
)

add_library(object-lifetime
    lifetime/rational-constructors.cpp
    lifetime/rational-copy-move.cpp
    lifetime/rational-assignment.cpp
    lifetime/geo-point-constructors.cpp
    lifetime/geo-point-copy-move.cpp
    lifetime/geo-point-assignment.cpp
)

foreach(example IN ITEMS
    date-setters stack-client construction-order
    explicit-conversion rule-zero buffer-lifetime
    rational-use implicit-default defaulted-constructor rational-copy
    implicit-conversion new-delete
)
    add_executable(${example} ${example}.cpp)
endforeach()

target_link_libraries(construction-order PRIVATE object-lifetime)

foreach(example IN ITEMS date-use date-transaction)
    add_executable(${example} ${example}.cpp)
    target_link_libraries(${example} PRIVATE date)
endforeach()

add_executable(stack-open stack-open.cpp)
target_link_libraries(stack-open PRIVATE plain-stack)
add_executable(date-open date-open.cpp)
target_link_libraries(date-open PRIVATE plain-date)
add_executable(date-alternative-use date-alternative-use.cpp)
target_link_libraries(date-alternative-use PRIVATE date-alternative)
add_executable(rational-constructors rational-constructors.cpp)
target_link_libraries(rational-constructors PRIVATE rational-constructors-demo)

add_executable(int-array-use int-array-use.cpp)
target_link_libraries(int-array-use PRIVATE int-array)
add_executable(int-array-move-use int-array-move-use.cpp)
target_link_libraries(int-array-move-use PRIVATE moving-int-array)
