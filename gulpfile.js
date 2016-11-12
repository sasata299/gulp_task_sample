var gulp = require('gulp');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');
var minify = require('gulp-minify-css');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var plumber = require('gulp-plumber');

gulp.task('stylus', function(){
  return gulp.src('styl/**/*.styl')
    .pipe(plumber())
    .pipe(stylus())
    .pipe(gulp.dest('css/'))
});

gulp.task('optimize', ['stylus'], function() {
  return gulp.src('css/**/*.css')
    .pipe(concat('all.css'))
    .pipe(gulp.dest('css/'))
    .pipe(minify())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('css/'));
});

gulp.task('stylusOptimize', function() {
  runSequence(
    'stylus',
    'optimize'
  );
});

gulp.task('hello', function() {
  console.log('Hello gulp!');
});

gulp.task('watch', function() {
  gulp.watch(['styl/**/*.styl'], ['stylus']);
});

gulp.task('default', ['hello']);
