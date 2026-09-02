# Основы программирования на C++

Основной репозиторий конспектов, слайдов и примеров кода курса.

## Локальный просмотр

1. Установите Quarto и рекомендуемое расширение `Quarto` для VS Code.
2. Откройте эту папку в VS Code.
3. Выполните:

   ```sh
   quarto preview
   ```

## Слайды

Собрать все лекции как Reveal.js-презентации:

```sh
quarto render --profile slides --to revealjs
```

Собрать только одну лекцию:

```sh
quarto render 00-introduction.md --profile slides --to revealjs
```

Результат появится в `_site/slides/`.

## Публикация

В настройках репозитория выберите **Settings → Pages → Build and deployment → Source: GitHub Actions**. После этого каждый push в ветку `main` будет пересобирать и публиковать конспекты и презентации.
