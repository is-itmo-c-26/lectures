---
title: "Установка окружения: Linux"
description: "Clang, CMake и Git на Ubuntu и Debian через apt"
page-navigation: false
---

Гайд предполагает, что VS Code вы уже поставили — если нет, вернитесь на [основную страницу](01-setup.md).

Команды ниже рассчитаны на дистрибутивы с `apt`: Ubuntu, Debian и их производные. В других дистрибутивах пакеты называются так же, а команда установки своя: `dnf install` в Fedora, `pacman -S` в Arch.

## Установка

Сначала обновляем списки пакетов, иначе `apt` может не найти свежие версии:

```sh
sudo apt-get update
```

Дальше сами инструменты:

```sh
sudo apt install clang -y
```

```sh
sudo apt install cmake
```

```sh
sudo apt install git
```

Здесь `sudo` значит, что команда выполняется от суперпользователя (скорее всего у вас спросят пароль), `apt` — пакетный менеджер, а флаг `-y` заранее отвечает «да» на вопрос об установке.

## Проверка

```sh
clang++ --version
cmake --version
git --version
```

Каждая команда должна напечатать версию, а не «command not found».

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
