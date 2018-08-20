var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-clean-css');

var src = {
  scss: 'src/scss/**/*.+(scss|sass)',
  css: 'src/css',
} ;

gulp.task('userefer', function () {
  return gulp.src('src/*.html')
      .pipe(useref())
      .pipe(gulp.dest('dist'));
});

gulp.task('html', function () {
return gulp.src('src/*.html')
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', minifyCss()))
    .pipe(gulp.dest('dist'));
});


gulp.task('scss', function () {
  return gulp.src(src.scss)
  .pipe(sass())
  .pipe(gulp.dest(src.css))
  .pipe(browserSync.reload({
    stream: true,
  }));
});

gulp.task('browserSync', function(){
  browserSync({
    server: {
      baseDir: 'src',
    } ,
  });
});

gulp.task('watch', ['browserSync'], function(){
  gulp.watch(src.scss, ['scss']);
  gulp.watch('src/*html', browserSync.reload);
});

//склейка js в 1
//минификация js 
//то же самое с css всё это для html css js
//jquery чтобы бралось из папки node modules и клалось в js например