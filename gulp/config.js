'use strict';

module.exports = {
  tasks: [
    './gulp/tasks/clean.js',
    './gulp/tasks/html.js',
    './gulp/tasks/css.js',
    './gulp/tasks/js.js',
    './gulp/tasks/img.js',
    './gulp/tasks/copy.js',
    './gulp/tasks/watch.js',
    './gulp/tasks/serve.js'
  ],
  autoprefixer: {
    browsers: ['defaults', 'ie >= 10'],
    add: true,
    remove: true,
    cascade: false
  },
  cleanCss: {
    dev: {
      format: 'beautify',
      level: {
        1: {
          all: false,
          cleanupCharsets: true
        }
      },
      debug: true
    },
    prod: {
      level: 2,
      debug: true
    }
  }
};