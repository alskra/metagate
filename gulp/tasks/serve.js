'use strict';

module.exports = function () {
  $.gulp.task('serve', function () {
    $.browserSync.init({
      open: true,
      server: 'build'
    });
    //$.browserSync.watch('build/**', $.browserSync.reload);
  });
};
