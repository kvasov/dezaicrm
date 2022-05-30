var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass')(require('sass'));
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');

gulp.task('css', function () {
  return gulp
    .src('sass/**/*.scss')
    .pipe(sass())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false,
      })
    )

    .pipe(gulp.dest('app/css/'))
    .on('end', browserSync.reload);
});

gulp.task('serve', function (done) {
  browserSync.init({
    server: '',
  });

  gulp.watch('sass/**/*.scss', gulp.series('css'));
  gulp.watch('*.html').on('change', () => {
    browserSync.reload();
    done();
  });

  done();
});

gulp.task('default', gulp.series('serve'));
