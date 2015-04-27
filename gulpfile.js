var gulp = require('gulp');
var browserify = require('gulp-browserify');
var mocha = require('gulp-mocha');
var generateSuite = require('gulp-mocha-browserify-suite');

gulp.task('default', function() {
  gulp.src('./drl.js')
    .pipe(browserify({
      transform: ['babelify'],
      debug: true
    }))
    .pipe(gulp.dest('./build'))

  gulp.src('./examples/test.js')
    .pipe(browserify({
      transform: ['babelify'],
      debug: true
    }))
    .pipe(gulp.dest('./build'))
});

gulp.task('watch', ['default'], function(){
  gulp.watch(['./drl.js', './src/**/*.js', './examples/**/*.js'], ['default']);
});

gulp.task('test', function() {
  return gulp.src('./spec/**/*', {read: false})
    .pipe(generateSuite())
    .pipe(browserify({transform: ['babelify']}))
    .pipe(gulp.dest('./tmp'))
    .pipe(mocha());
});