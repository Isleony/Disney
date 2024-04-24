const { src, dest, parallel, series, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');

function styles() {
    return src('./src/styles/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(dest('./dist/css'));
}

function images() {
    return gulp.src('./src/images/**/*.{jpg,png,gif,svg,jpeg}')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'))
}


function scripts() {
    return src('./src/scripts/*.js')
        .pipe(uglify())
        .pipe(dest('./dist/js'));
}

function htmlmini() {
    return src('./src/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            collapseInlineTagWhitespace: true
        }))
        .pipe(dest('./dist'));
}

exports.default = parallel(styles, images, scripts, htmlmini);

exports.watch = function () {
    watch('./src/styles/*.scss', styles);
    watch('./src/scripts/*.js', scripts);
    watch('./src/images/**/*.{jpg,png,gif,svg}', images);
    watch('./src/*.html', htmlmini);
}
