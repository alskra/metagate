## Зависимости проекта

Если не установлен `yarn`, устанавливаем: [`https://yarnpkg.com/en/docs/install`](https://yarnpkg.com/en/docs/install)

Установка зависимостей: `yarn`

## Файловая структура
```js
source // исходники для сборки
|--block // блоки
|  |--[<block_name>]*
|  |  |--*.pug // описание разметки блока
|  |  |--*.scss // описание стилей блока
|  |  |--*.js // описание функционала блока
|--html
|  |--helper
|  |  |--var.pug
|  |  |--mixin.pug
|  |--part
|  |  |--[*.pug]* // включаемые блоки HTML, например, favicon
|  |--[*.pug]* // страницы
|--css
|  |--helper
|  |  |--_var.scss
|  |  |--_function.scss
|  |  |--_mixin.scss
|  |--part
|  |  |--[*.scss]* // импортируемые стили
|  |--lib.scss // библиотеки
|  |--app.scss // основной файл scss
|--js
|  |--lib.js // библиотеки
|  |--app.js // основной файл js
|--img
|  |--style // изображения оформления
|  |--svg-icon // svg-иконки, доступные после сборки напрямую и через спрайт 
|  |--content // контентные изображения
|--font // шрифты
|  |--[<font_name>]*
|  |  |--[<font_file>]*
|  |  |--*.css
|--favicon // файлы favicon
|--vendor // библиотеки
build // собранные файлы проекта
|--assets
|  |--css
|  |  |--lib.css
|  |  |--lib.css.map
|  |  |--lib.min.css // дополнительно генерируется при production-сборке
|  |  |--app.css
|  |  |--app.css.map
|  |  |--app.min.css // дополнительно генерируется при production-сборке
|  |--js
|  |  |--lib.js
|  |  |--lib.js.map
|  |  |--lib.min.js // дополнительно генерируется при production-сборке
|  |  |--app.js
|  |  |--app.js.map
|  |  |--app.min.js // дополнительно генерируется при production-сборке
|  |--img
|  |  |--style // изображения оформления
|  |  |--svg-icon // svg-иконки, доступные через спрайт svg-icon-lib.svg
|  |  |--svg-icon-lib.svg // svg-спрайт
|  |  |--content // контентные изображения
|  |--font // шрифты
|  |  |--[<font_name>]*
|  |  |  |--[<font_file>]*
|  |  |  |--*.css
|  |--favicon // файлы favicon
|--[*.html]* // страницы
```
## Gulp-задачи

`gulp clean` - удаление папки `./build`.

`gulp html` - компиляция файлов `*.pug` в `*.html` с заданным форматированием.

`gulp css` - компиляция файлов `*.scss` в `*.css`. Автопрефиксы, преобразование единиц, минимизация (при production-сборке). В папке назначения создается sourcemap-файл.

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
`gulp prod` - сборка в режиме **production** (то же, что `gulp` + минимизация `*.css` и `*.js`).
