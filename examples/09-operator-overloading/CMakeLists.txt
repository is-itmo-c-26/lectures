cmake_minimum_required(VERSION 3.16)
project(operator_overloading LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)
if(CMAKE_CXX_COMPILER_ID MATCHES "Clang|GNU")
    add_compile_options(-Wall -Wextra -pedantic)
endif()

add_library(rational
    rational-assignment.cpp rational-output.cpp rational-input.cpp
    rational-equality.cpp rational-less.cpp rational-order.cpp
    rational-prefix.cpp rational-postfix.cpp
    rational-add-assign.cpp rational-add.cpp
)
foreach(example IN ITEMS assignment input comparison increment conversion addition)
    add_executable(rational-${example}-use rational-${example}-use.cpp)
    target_link_libraries(rational-${example}-use PRIVATE rational)
endforeach()

add_executable(friend-use friend-use.cpp friend-output.cpp)
add_executable(array-use array-use.cpp)
add_executable(functor-use functor-use.cpp)
add_executable(default-order default-order.cpp)
add_executable(rational-three-way-use rational-three-way-use.cpp rational-three-way.cpp)
add_library(file-descriptor file-descriptor.cpp)
add_executable(file-use file-use.cpp)
target_link_libraries(file-use PRIVATE file-descriptor)
add_library(foo-ptr foo-ptr-access.cpp)
add_executable(foo-ptr-use foo-ptr-use.cpp)
target_link_libraries(foo-ptr-use PRIVATE foo-ptr)

enable_testing()
add_executable(validation validation.cpp)
target_link_libraries(validation PRIVATE rational file-descriptor foo-ptr)
add_test(NAME operators-and-invariants COMMAND validation)
