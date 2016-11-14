var gulp = require('gulp');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');
var minify = require('gulp-minify-css');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var browserSync = require('browser-sync');
var using = require('gulp-using');
var cached = require('gulp-cached');
var remember = require('gulp-remember');

function plumberWithNotify() {
  return plumber({ errorHandler: notify.onError("<%= error.message %>") });
}

gulp.task('stylus', function(){
  return gulp.src('styl/**/*.styl')
    .pipe(cached())
    .pipe(using())
    .pipe(remember())
    .pipe(plumberWithNotify())
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

gulp.task('server', function() {
  browserSync({
    browser: 'google chrome',
    server: {
      baseDir: './src'
      //directory: true
    },
    reloadDelay: 1000
  });
});

gulp.task('sync', ['server'], function() {
  gulp.watch(['./src/**/*.html'], browserSync.reload);
});

gulp.task('hello', function() {
  console.log('Hello gulp!');
});

gulp.task('watch', function() {
  gulp.watch(['styl/**/*.styl'], ['stylus']);
});

gulp.task('default', ['hello']);
