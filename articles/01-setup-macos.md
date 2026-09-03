---
title: "Установка окружения: macOS"
description: "Clang, CMake и Git на macOS через Homebrew"
page-navigation: false
---

Гайд предполагает, что VS Code вы уже поставили — если нет, вернитесь на [основную страницу](01-setup.md).

## Подготовка

Всё ставится через [Homebrew](https://brew.sh/) — пакетный менеджер для macOS. Если его ещё нет, поставьте по инструкции с сайта.

Ещё понадобятся Command Line Tools от Apple: без них у компилятора не будет системных заголовков и стандартной библиотеки.

```sh
xcode-select --install
```

Если они уже стоят, команда просто скажет об этом.

## Установка

```sh
brew install llvm
```

```sh
brew install cmake
```

```sh
brew install git
```

Пакет `llvm` — это и есть Clang вместе с остальным инструментарием LLVM: отладчиком `lldb`, форматтером `clang-format` и линтером `clang-tidy`.

## Проверка

```sh
clang++ --version
cmake --version
git --version
```

> Примечание: Homebrew ставит LLVM «keg-only» — то есть рядом с системным компилятором, но не в `PATH`. Поэтому `clang++ --version` скорее всего покажет Apple clang, который приехал с Command Line Tools. Для лабораторных этого достаточно. Если нужен именно свежий Clang из Homebrew, добавьте его в `PATH`:
>
> ```sh
> echo 'export PATH="/opt/homebrew/opt/llvm/bin:$PATH"' >> ~/.zshrc
> ```
>
> На Intel-маках путь другой — `/usr/local/opt/llvm/bin`. После этого перезапустите терминал.

## Пробный проект

Проверить, что всё работает, можно на любом маленьком проекте:

```{.cpp filename="main.cpp"}
{{< include ../examples/articles/01-setup/main.cpp >}}
```

```{.cmake filename="CMakeLists.txt"}
{{< include ../examples/articles/01-setup/CMakeLists.txt >}}
```

Из корня проекта:

```sh
cmake -S . -B cmake-build
cmake --build cmake-build --target HelloWorld
./cmake-build/HelloWorld
```

Программа должна напечатать `hello`.
