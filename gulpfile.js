const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = import('gulp-imagemin');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');

function styles() {
  try {
    return gulp.src('./src/styles/*.scss')
      .pipe(sass({
        outputStyle: 'compressed'
      }))
      .pipe(gulp.dest('./dist/css'));
  } catch (error) {
    console.error('Error compiling Sass:', error);
  }
}

function images() {
  try {
    return gulp.src('./src/images/**/*.{jpg,png,gif,svg,jpeg}')
      .pipe(imagemin())
      .pipe(gulp.dest('./dist/images'));
  } catch (error) {
    console.error('Error optimizing images:', error);
  }
}

function scripts() {
  try {
    return gulp.src('./src/scripts/*.js')
      .pipe(uglify())
      .pipe(gulp.dest('./dist/js'));
  } catch (error) {
    console.error('Error minifying scripts:', error);
  }
}

function htmlmini() {
  try {
    return gulp.src('./src/*.html')
      .pipe(htmlmin({
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true
      }))
      .pipe(gulp.dest('./dist'));
  } catch (error) {
    console.error('Error minifying HTML:', error);
  }
}

exports.default = gulp.parallel(styles, images, scripts, htmlmini);
exports.watch = function () {
  gulp.watch('./src/styles/*.scss', gulp.parallel(styles));
  gulp.watch('./src/scripts/*.js', gulp.parallel(scripts));
  gulp.watch('./src/*.html', gulp.parallel(htmlmini));
};
