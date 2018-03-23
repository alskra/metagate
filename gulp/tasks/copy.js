'use strict';

module.exports = function () {
  $.gulp.task('copy', function () {
    return $.combiner.obj([
      $.gulp.src(['src/fonts/**/*.*', 'src/upload/**/*.*']),
      $.gp.newer('build/upload'),
      $.gp.if(function (file) {
        return file.base.indexOf('fonts') === -1
      }, $.gp.imagemin([
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
      })),
      $.gp.debug({title: 'Debug task "copy"'}),
      $.gulp.dest(function (file) {
        return file.base.indexOf('fonts') !== -1 ? 'build/fonts' : 'build/upload'
      }),
      $.browserSync.stream()
    ]).on('error', $.gp.notify.onError(function (err) {
      return {
        title: 'Error task "copy"',
        message: err.message
      }
    }));
  });
};
