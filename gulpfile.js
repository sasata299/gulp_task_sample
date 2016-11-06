var gulp = require('gulp');
var stylus = require('gulp-stylus');

gulp.task('stylus', function(){
  return gulp.src('styl/**/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest('css/'));
});

gulp.task('hello', function() {
  console.log('Hello gulp!');
});

gulp.task('default', ['hello']);
