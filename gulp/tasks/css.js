'use strict';

module.exports = function () {
  $.gulp.task('css', function () {
    return $.combiner.obj([
      $.gulp.src('src/css/*.scss'),
      $.gp.if($.isWatch, $.emittySCSS.stream($.scssChangedFile)),
      $.gp.sourcemaps.init(),
      $.gp.sassGlob(),
      $.gp.sass({
        includePaths: [],
        outputStyle: 'expanded',
        functions: $.sassInlineSVG()
      }),
      $.gp.autoprefixer($.config.autoprefixer),
      $.gp.pxtorem({
        rootValue: 16,
        unitPrecision: 5,
        propList: ['*'],
        selectorBlackList: [],
        replace: true,
        mediaQuery: true,
        minPixelValue: 0
      }),
      $.gp.cleanCss($.config.cleanCss.dev),
      $.gp.sourcemaps.write('.'),
      $.gulp.dest('build/css'),
      $.gp.if(!$.isDevelopment, $.combiner.obj([
        $.gp.filter(['**', '!**/*.min.*', '!**/*.map']),
        $.gp.rename({suffix: '.min'}),
        $.gp.cleanCss($.config.cleanCss.prod),
        $.gulp.dest('build/css'),
      ])),
      $.gp.debug({title: 'Debug task "css"'}),
      $.browserSync.stream()
    ]).on('error', $.gp.notify.onError(function (err) {
      return {
        title: 'Error task "css"',
        message: err.message
      }
    }));
  });
};