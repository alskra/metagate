# Сборка проекта

Если не установлен `yarn`, устанавливаем: `npm install --global yarn`

Установка зависимостей: `yarn`

Сборка в режиме **development**: `gulp`, `gulp default`

Сборка в режиме **production**: `gulp prod`

При `gulp prod` происходит все то же самое + минимизация css и js.

## Файловая структура

`./srs` -> `./build`

gulp-задачи находятся в `./gulp`