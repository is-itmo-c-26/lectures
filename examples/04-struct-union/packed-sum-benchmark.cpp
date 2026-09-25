#include "packing-benchmark-types.h"
#include <benchmark/benchmark.h>
#include <vector>

static void SumPacked(benchmark::State& state) {
    std::vector<PackedData> data(4096, {'A', 1});
    benchmark::DoNotOptimize(data.data());
    for (auto _ : state) {
        benchmark::ClobberMemory();
        std::int64_t sum = 0;
        for (const auto& item : data) {
            sum += item.value;
        }
        benchmark::DoNotOptimize(sum);
    }
}
BENCHMARK(SumPacked);
BENCHMARK_MAIN();
