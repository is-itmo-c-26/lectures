#include "integer-comparison.h"
#include <benchmark/benchmark.h>

static void IntComparison(benchmark::State& state) {
    Name a{.text = {"0123456789AB", "12"}};
    Name b{.text = {"0123456789AB", "10"}};

    benchmark::DoNotOptimize(a);
    benchmark::DoNotOptimize(b);
    for (auto _ : state) {
        bool result = IntCompare(a, b);
        benchmark::DoNotOptimize(result);
    }
}
BENCHMARK(IntComparison);
BENCHMARK_MAIN();
