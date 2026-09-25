#include "name-comparison.h"
#include <benchmark/benchmark.h>

static void NameComparison(benchmark::State& state) {
    Name a{.text = {"0123456789AB", "12"}};
    Name b{.text = {"0123456789AB", "10"}};

    benchmark::DoNotOptimize(a);
    benchmark::DoNotOptimize(b);
    for (auto _ : state) {
        bool result = NameCompare(a, b);
        benchmark::DoNotOptimize(result);
    }
}
BENCHMARK(NameComparison);
BENCHMARK_MAIN();
