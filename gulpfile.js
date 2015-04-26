var gulp = require('gulp');
var browserify = require('gulp-browserify');

gulp.task('default', function() {
  gulp.src('./drl.js')
    .pipe(browserify({
      transform: ['babelify']
    }))
    .pipe(gulp.dest('./build'))

  gulp.src('./examples/test.js')
    .pipe(browserify({
      transform: ['babelify']
    }))
    .pipe(gulp.dest('./build'))
});

gulp.task('watch', ['default'], function(){
  gulp.watch(['./drl.js', './src/**/*.js', './examples/**/*.js'], ['default']);
});