## Сборка проекта

Если не установлен `yarn`, устанавливаем: `npm install --global yarn`

Установка зависимостей: `yarn`

## Файловая структура

`./srs` -> `./build`

gulp-задачи находятся в `./gulp`

## Gulp-задачи

`gulp clean` - удаление папки `./build`.

`gulp html` - компиляция файлов `*.pug` в `*.html` с заданным форматированием.

`gulp css` - компиляция файлов `*.scss` в `*.css`. Автопрефиксы, преобразование единиц, минимизация. В папке назначения создается sourcemap-файл.

`gulp js` - сборка `*.js` посредством [`gulp-include`](https://www.npmjs.com/package/gulp-include). Минимизация. В папке назначения создается sourcemap-файл.

`gulp img` - минимизация `*.gif, *.jpg, *.png, *.svg` изображений, а также генерация svg-спрайта.

`gulp copy` - копирование файлов из `./srs` в `./build`.

`gulp watch` - обеспечивает отслеживание изменений и запуск соответствующих тасков для всех редактируемых исходников.

`gulp serve` - сервер на директории `./build`.

`gulp`, `gulp default` - сборка в режиме **development**.
```js
$.gulp.task('default', $.gulp.series(
  'clean',
  'img',
  $.gulp.parallel(
    'html',
    'css',
    'js',
    'copy'
  ),
  $.gulp.parallel(
    'watch',
    'serve'
  )
));
```

`gulp prod` - сборка в режиме **production** (то же, что `gulp` + минимизация `.css` и `.js`).
