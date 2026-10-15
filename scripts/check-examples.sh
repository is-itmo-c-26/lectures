#!/usr/bin/env bash
# Проверяет примеры кода так же, как CI курса проверяет лабораторные:
#   1. компиляция clang++ -std=c++20 -Wall -Wextra -pedantic без диагностик;
#   2. clang-tidy с конфигом .clang-tidy из корня без предупреждений;
#   3. ни одной строки длиннее 80 символов.
# Файлы из scripts/intentional-examples.txt пропускаются в пунктах 1 и 2.
#
# Переменные окружения: CXX (по умолчанию clang++), CLANG_TIDY (clang-tidy).
set -u

cd "$(dirname "$0")/.."

CXX="${CXX:-clang++}"
CLANG_TIDY="${CLANG_TIDY:-clang-tidy}"
if ! command -v "$CLANG_TIDY" >/dev/null 2>&1 && [ -x /opt/homebrew/opt/llvm/bin/clang-tidy ]; then
    CLANG_TIDY=/opt/homebrew/opt/llvm/bin/clang-tidy
fi

FLAGS=(-std=c++20 -Wall -Wextra -pedantic -fsyntax-only)
failures=0

intentional=$(grep -vE '^\s*(#|$)' scripts/intentional-examples.txt | awk '{print $1}')
is_intentional() {
    grep -qxF "$1" <<<"$intentional"
}

while IFS= read -r file; do
    if ! is_intentional "$file"; then
        if ! output=$("$CXX" "${FLAGS[@]}" "$file" 2>&1) || grep -qE 'warning:|error:' <<<"$output"; then
            echo "compile: $file"
            echo "$output" | sed 's/^/    /'
            failures=$((failures + 1))
        fi

        tidy_output=$("$CLANG_TIDY" --quiet "$file" -- -std=c++20 2>/dev/null | grep -E 'warning:|error:' || true)
        if [ -n "$tidy_output" ]; then
            echo "clang-tidy: $file"
            echo "$tidy_output" | sed 's/^/    /'
            failures=$((failures + 1))
        fi
    fi

    long_lines=$(perl -CSD -Mutf8 -ne 'chomp; print "$ARGV:$.: ", length, " символов\n" if length > 80' "$file")
    if [ -n "$long_lines" ]; then
        echo "line length: $file"
        echo "$long_lines" | sed 's/^/    /'
        failures=$((failures + 1))
    fi
done < <(find examples -name '*.cpp' | sort)

for listed in $intentional; do
    if [ ! -f "$listed" ]; then
        echo "intentional-examples.txt: файл не найден: $listed"
        failures=$((failures + 1))
    fi
done

if [ "$failures" -ne 0 ]; then
    echo
    echo "Проблем: $failures"
    exit 1
fi

echo "Примеры в порядке: $(find examples -name '*.cpp' | wc -l | tr -d ' ') файлов проверено"
