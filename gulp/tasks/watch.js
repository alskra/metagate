'use strict';

module.exports = function () {
  $.gulp.task('watch', function () {
    $.isWatch = true;

    $.gulp.watch('src/**/*.pug', $.gulp.series('html'))
      .on('all', (event, filepath) => {
        event !== 'unlink' ? $.pugChangedFile = filepath : undefined;
      });
    $.gulp.watch('src/**/*.{css,scss}', $.gulp.series('css'))
      .on('all', (event, filepath) => {
        event !== 'unlink' ? $.scssChangedFile = filepath : undefined;
      });
    $.gulp.watch('src/**/*.js', $.gulp.series('js'));
    $.gulp.watch('src/img/**/*.*', $.gulp.series('img'));
    $.gulp.watch(['src/fonts/**/*.*', 'src/upload/**/*.*'], $.gulp.series('copy'));
  });
};
