---
title: "Вводная лекция. Язык C и C++"
---

::: {.content-visible unless-format="revealjs"}

[Открыть слайды](slides/00-introduction.html){.btn .btn-outline-primary target="_blank"}

:::

## Основы программирования.


- Язык C++
- Хвастунов Александр Павлович
- Фадеев Сергей Викторович
- Команда 30 человек (лекторы, практики, менторы)

## Что? Где? Когда?

- Минимум 60 баллов
- Максимум 100 балла = 60 за лабы + 10 за live coding + 30 за зачет + доп баллы
- 5 лабораторных работ
- Live Coding
- ДифЗачет в декабре\июне
- Все лекции, лабы и **вопросы** для зачета в Git


## Присоединяйтесь к Telegram-каналу курса

:::: {.columns}
::: {.column width="55%"}

- Объявления и организационная информация
- Материалы курса
- Вопросы преподавателям, менторам и студентам

:::
::: {.column width="45%"}
::: {style="text-align: center;"}

[![](assets/00-introduction/telegram-channel-qr.svg){fig-alt="QR-код приглашения в Telegram-канал курса" width="360px"}](https://t.me/+KC_tNYHlmLBhNWFi)

<https://t.me/+KC_tNYHlmLBhNWFi>

:::
:::
::::

## Цель


- “Научиться объяснять компьютеру свои мысли”
- С++ 98, 11, 14, 17, 20, 23
- Процедурное программирование
- ООП
- Основы проектирования
- “Культура программирования”

## Лабы


- Git
- Проверка на плагиат/использование ИИ
- Google Code Style
- Soft deadline через 2 недели (шаг в неделю 1, 0.8, 0.65, 0.5)
- Основы git на первой практике и на ЦК
- Все лабы в git + cmake

## Алгоритм сдачи лаб


- Git (для каждой лабы будет сгенерирован репозиторий для каждого)
- Отдельная ветка для каждого дедлайна (название ветки deadline_N, начиная с 0)
- Готовый код выложить через PR до дедлайна (не мержить!)
- Заполнить форму с заявкой на review (не обязательно)
- Исправить замечания полученные на ревью (если оно было)
- Показать лабу преподавателю на практике

## Семинары


- Регулярные
- Необязательные
- Дополняют материалы лекций


## От UNIX к C++


- 1969–1973: Деннис Ритчи разработал C в Bell Labs; язык вырос из B Кена Томпсона
- C создавался как язык системного программирования для UNIX
- Лето 1973: ядро UNIX переписано на C — важный шаг к переносимости системы
- 1978: Брайан Керниган и Деннис Ритчи выпустили первое издание *The C Programming Language* (K&R)
- 1983: комитет ANSI X3J11 начал стандартизацию C
- 1979–1985: «C with Classes» превратился в C++; название появилось в 1983 году, первый коммерческий выпуск — в 1985-м

::: {.notes}
[Sources]

- Dennis M. Ritchie, *The Development of the C Language*: <https://www.bell-labs.com/usr/dmr/www/chist.pdf>
- Dennis M. Ritchie, Ken Thompson, *The UNIX Time-Sharing System*: <https://www.bell-labs.com/usr/dmr/www/cacm.pdf>
- Bjarne Stroustrup, *A History of C++: 1979–1991*: <https://stroustrup.com/hopl2.pdf>
- NIST, FIPS 160 / ANSI X3.159-1989: <https://www.govinfo.gov/content/pkg/GOVPUB-C13-175eb571b06fe7faf62ff6b06be3a8ec/pdf/GOVPUB-C13-175eb571b06fe7faf62ff6b06be3a8ec.pdf>

:::

## Стандартизация С


- 1989: ANSI X3.159-1989 — **C89**, первый стандарт C
- 1990: ISO/IEC 9899:1990 — **C90**, международная версия C89
- 1999: ISO/IEC 9899:1999 — **C99**
- 2011: ISO/IEC 9899:2011 — **C11**
- 2018: ISO/IEC 9899:2018 — **C17**, в основном исправления стандарта
- 2024: ISO/IEC 9899:2024 — **C23**, текущая опубликованная версия

::: {.notes}
[Sources]

- ISO/IEC JTC 1/SC 22/WG14, *Project status and milestones*: <https://www9.open-std.org/JTC1/SC22/WG14/www/projects.html>
- ISO, *ISO/IEC 9899:2024 — Programming languages — C*: <https://www.iso.org/standard/82075.html>

:::

## Стандартизация C++


- 1998: ISO/IEC 14882:1998 — **C++98**, первый международный стандарт C++
- 2003: **C++03**, корректирующая редакция C++98
- 2011: **C++11**, крупное обновление, долго разрабатывавшееся под именем C++0x
- 2014, 2017, 2020: **C++14**, **C++17**, **C++20**
- 2024: ISO/IEC 14882:2024 — опубликованная редакция, известная как **C++23**
- 2026: **C++26** достиг стадии Draft International Standard (DIS)

::: {.notes}
[Sources]

- ISO, *ISO/IEC 14882:1998 — Programming languages — C++*: <https://www.iso.org/standard/25845.html>
- ISO, *ISO/IEC 14882:2024 — Programming languages — C++*: <https://www.iso.org/standard/83626.html>
- WG21 N5051, *Editors’ Report: Programming Languages — C++*: <https://www9.open-std.org/JTC1/SC22/WG21/docs/papers/2026/n5051.html>
- ISO, *ISO/IEC DIS 14882 — Programming languages — C++*: <https://committee.iso.org/standard/91179.html?browse=tc>

:::

## Язык C


- Язык общего назначения с акцентом на системное программирование
- Процедурный, статически типизированный и компилируемый
- Даёт низкоуровневый контроль над памятью и представлением данных
- Предполагает ручное управление динамической памятью
- Имеет компактное ядро и сравнительно небольшую стандартную библиотеку
- Позволяет создавать эффективные и переносимые программы
- Стандартизирован ISO

::: {.notes}
[Sources]

- ISO, *ISO/IEC 9899:2024 — Programming languages — C*: <https://www.iso.org/standard/82075.html>
- Dennis M. Ritchie, *The Development of the C Language*: <https://www.bell-labs.com/usr/dmr/www/chist.pdf>

:::

## Язык C++


- Язык общего назначения с акцентом на системное программирование
- Статически типизированный и компилируемый
- Мультипарадигменный: процедурное, объектно-ориентированное и обобщённое программирование
- Объединяет низкоуровневый контроль и высокоуровневые абстракции
- Позволяет создавать абстракции без обязательных накладных расходов
- Большой язык с богатой стандартной библиотекой
- Стандартизирован ISO

::: {.notes}
[Sources]

- ISO, *ISO/IEC 14882:2024 — Programming languages — C++*: <https://www.iso.org/standard/83626.html>
- Bjarne Stroustrup, *FAQ: What is C++? Is C++ low-level?*: <https://stroustrup.com/bs_faq.html>

:::

## C и C++: общая основа, но разные языки


- C++ развился из C и сохранил большую часть его синтаксиса
- Языки имеют большое общее подмножество
- Современный C не является строгим подмножеством C++
- C++ отличается более строгой проверкой типов
- C и C++ стандартизируются и развиваются независимо
- Код на C можно переиспользовать в C++ (при соблюдении общего синтаксиса)
- C и C++ сильно отличаются как по сложности, так и по принятым архитектурным решениям, которые используются в обоих языках

::: {.notes}
[Sources]

- Bjarne Stroustrup, *FAQ: Is C a subset of C++?*: <https://stroustrup.com/bs_faq.html>
- ISO/IEC JTC 1/SC 22/WG14, *The C Standard charter*: <https://open-std.org/jtc1/sc22/wg14/www/docs/n3280.htm>

:::

## Где применяют C и C++


- **Системное ПО:** ядра ОС, драйверы и системные библиотеки
- **Встраиваемые системы:** микроконтроллеры, устройства и системы реального времени
- **Инструменты разработки:** компиляторы и среды выполнения
- **Высокопроизводительные приложения:** моделирование, финансы и научные вычисления
- **Игры и графика:** игровые движки, рендеринг и обработка изображений
- **Инфраструктура:** браузеры, СУБД и сетевые сервисы
- **Машинное обучение:** вычислительные ядра, фреймворки и инференс

::: {.notes}
[Sources]

- Linux Kernel documentation, *Programming Language*: <https://docs.kernel.org/process/programming-language.html>
- LLVM, *Coding Standards*: <https://llvm.org/docs/CodingStandards.html>
- Epic Games, *Programming with C++ in Unreal Engine*: <https://dev.epicgames.com/documentation/en-us/unreal-engine/programming-with-cplusplus-in-unreal-engine>
- PyTorch, *The C++ Frontend*: <https://docs.pytorch.org/cppdocs/frontend>

:::

## Средства разработки


- Компилятор: **Clang**; также GCC и MSVC
- Сборка проекта: **CMake**
- Редактор и IDE: **Visual Studio Code (VS Code)**; также CLion, Visual Studio и Qt Creator
- Тестирование: **GoogleTest**; также Catch2
- Контроль версий: **Git**
- Отладка и качество кода: LLDB/GDB, санитайзеры, clang-format и clang-tidy

::: {.notes}
[Sources]

- Clang documentation: <https://clang.llvm.org/docs/>
- CMake documentation: <https://cmake.org/documentation/>
- Visual Studio Code documentation: <https://code.visualstudio.com/docs>
- GoogleTest documentation: <https://google.github.io/googletest/>
- Git documentation: <https://git-scm.com/doc>

:::

## Фундаментальные книги и классика


:::: {.columns}

::: {.column width="50%"}
### Основы

- Керниган, Ритчи — *Язык программирования C*
- Страуструп — *Язык программирования C++*
- Липпман и др. — *C++ Primer*
- Джосаттис — *Стандартная библиотека C++*
- Онлайн-справочник — [cppreference.com](https://en.cppreference.com/)
:::

::: {.column width="50%"}
### Классика

- Мейерс — *Effective Modern C++*
- Саттер — *Exceptional C++*
- Александреску — *Современное проектирование на C++*
- Гамма и др. — *Паттерны проектирования*
- Буч и др. — *Объектно-ориентированный анализ и проектирование*
:::

::::

::: {.notes}
[Sources]

- Brian W. Kernighan, Dennis M. Ritchie, *The C Programming Language*, 2nd ed.: <https://www.informit.com/content/images/9780131103627/samplepages/0131103628.pdf>
- Bjarne Stroustrup, *The C++ Programming Language*, 4th ed.: <https://stroustrup.com/>
- Stanley B. Lippman, Josée Lajoie, Barbara E. Moo, *C++ Primer*, 5th ed.: <https://www.informit.com/store/c-plus-plus-primer-9780133053043>
- Nicolai M. Josuttis, *The C++ Standard Library*, 2nd ed.: <https://www.informit.com/store/c-plus-plus-standard-library-a-tutorial-and-reference-9780132978286>
- Scott Meyers, *Effective Modern C++*: <https://www.oreilly.com/library/view/effective-modern-c/9781491908419/>
- Herb Sutter, *Exceptional C++*: <https://www.informit.com/store/exceptional-c-plus-plus-47-engineering-puzzles-programming-9780201615623>
- Andrei Alexandrescu, *Modern C++ Design*: <https://www.informit.com/store/modern-c-plus-plus-design-generic-programming-and-design-9780133387629>
- Erich Gamma et al., *Design Patterns*: <https://www.informit.com/store/design-patterns-elements-of-reusable-object-oriented-software-9780201633610>
- Grady Booch et al., *Object-Oriented Analysis and Design with Applications*, 3rd ed.: <https://www.informit.com/store/object-oriented-analysis-and-design-with-applications-9780132800044>

:::

## Hello, world! (Та самая программа)


```{.cpp filename="hello-world.cpp"}
{{< include examples/00-introduction/hello-world.cpp >}}
```

[![](assets/compiler-explorer.svg){.godbolt-link-image width="32"}][godbolt-hello-world]{aria-label="Open in Compiler Explorer"}

::: {.notes}
[Sources]

- [Интерактивный пример в Compiler Explorer][godbolt-hello-world]
- Compiler Explorer, *URL serialization*: <https://github.com/compiler-explorer/compiler-explorer/blob/main/shared/url-serialization.ts>

:::

[godbolt-hello-world]: <https://godbolt.org/#g:!((g:!((h:codeEditor,i:(j:1,lang:c%2B%2B,options:(compileOnChange:'0'),source:'%23include+%3Ciostream%3E%0A%0Aint+main()+%7B%0A++++std::cout+%3C%3C+%22Hello+world!!%5Cn%22%3B%0A%0A++++return+0%3B%0A%7D%0A'),l:'5'),(h:executor,i:(compilationPanelShown:'0',compiler:clang2310,compilerOutShown:'0',lang:c%2B%2B,libs:!(),options:'-std%3Dc%2B%2B20+-O0',source:1,tree:0),l:'5')),l:'2')),version:4>
<!-- godbolt source="examples/00-introduction/hello-world.cpp" compiler="clang2310" options="-std=c++20 -O0" -->

## Cmake


- <https://cmake.org/>
- Поддержка VSCode
- Генерация проектов для других сред
- Полезные команды
- сmake -B build
- cmake –build build

## Вопросы

:::: {.columns}
::: {.column width="50%"}
::: {style="text-align: center;"}

[![](assets/00-introduction/telegram-channel-qr.svg){fig-alt="QR-код приглашения в Telegram курса" width="260px"}](https://t.me/+KC_tNYHlmLBhNWFi)

**Telegram ITMO C++ 26/27 — чат**

<https://t.me/+KC_tNYHlmLBhNWFi>

:::
:::
::: {.column width="50%"}
::: {style="text-align: center;"}

[![](assets/00-introduction/telegram-news-qr.svg){fig-alt="QR-код приглашения в новостной Telegram-канал курса" width="260px"}](https://t.me/+FbV6Q3VFRZYxNDky)

**Telegram ITMO C++ 26/27 — News**

<https://t.me/+FbV6Q3VFRZYxNDky>

:::
:::
::::
