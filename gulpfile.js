'use strict';

global.$ = {
  package: require('./package.json'),
  config: require('./gulp/config'),

  path: require('path'),
  gulp: require('gulp'),
  gp: require('gulp-load-plugins')(),
  del: require('del'),
  browserSync: require('browser-sync').create(),
  combiner: require('stream-combiner2'),
  emittyPug: require('emitty').setup('src', 'pug'),
  emittySCSS: require('emitty').setup('src', 'scss'),
  sassInlineSVG: require('sass-inline-svg-utf8'),
  rsp: require('remove-svg-properties').stream,

  isDevelopment: process.env.NODE_ENV !== 'production',
  isWatch: false
};

$.config.tasks.forEach(function (taskPath) {
  require(taskPath)();
});

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

$.gulp.task('prod', $.gulp.series(
  function (done) {
    $.isDevelopment = false;
    done();
  },
  'default'
));