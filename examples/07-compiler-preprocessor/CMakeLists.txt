cmake_minimum_required(VERSION 3.16)
project(conditional_log LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

add_executable(conditional-log conditional-log.cpp)
target_compile_definitions(conditional-log PRIVATE DEBUG)
