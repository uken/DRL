var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var babelify = require('babelify');

gulp.task('default', ['drl', 'examples']);

gulp.task('drl', function(){
  var b = browserify({
    entries: './drl.js',
    debug: true,
    transform: [babelify.configure({
      jsxPragma: 'DRL.createElement'
    })]
  });

  return b.bundle()
    .pipe(source('drl.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./build'));
});

gulp.task('examples', function(){
  var b = browserify({
    entries: './examples/test.js',
    debug: true,
    transform: [babelify.configure({
      jsxPragma: 'DRL.createElement'
    })]
  });

  return b.bundle()
    .pipe(source('test.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./build'));
});

gulp.task('watch', ['default'], function(){
  gulp.watch(['./drl.js', './src/**/*.js', './examples/**/*.js'], ['default']);
});
