'use strict';

let count = 0;

module.exports = function () {
  $.gulp.task('img', $.gulp.series(
    function () {
      return $.combiner.obj([
        $.gulp.src(['src/img/**/*.*']),
        $.gp.newer('build/img'),
        $.gp.imagemin([
          $.gp.imagemin.gifsicle({interlaced: true}),
          require('imagemin-jpeg-recompress')({progressive: true}),
          $.gp.imagemin.optipng({optimizationLevel: 5}),
          $.gp.imagemin.svgo({
            plugins: [
              {removeViewBox: false},
              {cleanupIDs: true}
            ]
          })
        ], {
          verbose: true
        }),
        $.gp.debug({title: 'Debug task "img"'}),
        $.gulp.dest('build/img'),
        $.browserSync.stream()
      ]).on('error', $.gp.notify.onError(function (err) {
        return {
          title: 'Error task "img"',
          message: err.message
        }
      }));
    },
    function () {
      return $.combiner.obj([
        $.gulp.src(['build/img/svg-icons/**/*.svg']),
        $.gp.svgmin(function getOptions(file) {
          var prefix = $.path.basename(file.relative, $.path.extname(file.relative));
          return {
            plugins: [{
              cleanupIDs: {
                prefix: prefix + '-',
                minify: true
              }
            }]
          }
        }),
        $.rsp.remove({
          properties: [$.rsp.PROPS_FILL]
        }),
        $.gp.svgSymbols(
          {
            id: 'isvg-%f',
            class: '.isvg-%f',
            fontSize: 16,
            svgAttrs: {
              class: 'svg-symbols'
            },
            templates: ['default-svg', 'src/vendor/svg-symbols/_svg-symbols.scss']
          }
        ),
        $.gp.debug({title: 'Debug task "img.svg-symbols"'}),
        $.gulp.dest(function (file) {
          return file.extname === '.svg' ? 'build/img' : 'src/css/parts'
        }),
        $.browserSync.stream()
      ]).on('error', $.gp.notify.onError(function (err) {
        return {
          title: 'Error task "img.svg-symbols"',
          message: err.message
        }
      }));
    }
  ));
};