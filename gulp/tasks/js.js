'use strict';

module.exports = function () {
  $.gulp.task('js', function () {
    return $.combiner.obj([
      $.gulp.src('src/js/*.js'),
      $.gp.sourcemaps.init(),
      $.gp.include(),
      $.gp.if(function (file) {
        return file.basename !== 'libs.js'
      }, $.gp.babel({
        presets: ['@babel/env']
      })),
      $.gp.jsbeautifier({js: {
          indent_size: 2
        }}),
      $.gp.sourcemaps.write('.'),
      $.gulp.dest('build/js'),
      $.gp.if(!$.isDevelopment, $.combiner.obj([
        $.gp.filter(['**', '!**/*.min.*', '!**/*.map']),
        $.gp.rename({suffix: '.min'}),
        $.gp.uglify(),
        $.gulp.dest('build/js'),
      ])),
      $.gp.debug({title: 'Debug task "js"'}),
      $.browserSync.stream()
    ]).on('error', $.gp.notify.onError(function (err) {
      return {
        title: 'Error task "js"',
        message: err.message
      }
    }));
  });
};