'use strict';

var gulp = require('gulp');
var bs = require('browser-sync');

gulp.task('server', function() {
  bs.init({
    server: {
      baseDir: './src'
    }
  });
  gulp.watch('src/*',  function() {
    bs.reload();
  });
});
