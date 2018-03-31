'use strict';

module.exports = function () {
  $.gulp.task('html', function () {
    return $.combiner.obj([
      $.gulp.src('src/html/*.pug'),
      $.gp.if($.isWatch, $.emittyPug.stream($.pugChangedFile)),
      $.gp.pug({
        locals: {
          $: {
            package: $.package,
            config: $.config,
            isDevelopment: $.isDevelopment
          }
        }
      }),
      $.gp.prettify({indent_inner_html: true, indent_size: 2, unformatted: ['pre', 'code']}),
      // $.gp.typograf({
      //   locale: ['ru', 'en-US'],
      //   htmlEntity: {type: 'default'},
      //   safeTags: [
      //     ['<\\?php', '\\?>'],
      //     ['<no-typography>', '</no-typography>'],
      //     ['<textarea>', '</textarea>']
      //   ]
      // }),
      $.gp.debug({title: 'Debug task "html"'}),
      $.gulp.dest('build'),
      $.browserSync.stream()
    ]).on('error', $.gp.notify.onError(function (err) {
      return {
        title: 'Error task "html"',
        message: err.message
      }
    }));
  });
};
