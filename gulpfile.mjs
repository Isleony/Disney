import gulp from 'gulp';
import dartSass from 'gulp-dart-sass';
import imagemin from 'gulp-imagemin';
import uglify from 'gulp-uglify';
import htmlmin from 'gulp-htmlmin';

function styles() {
    return gulp.src('./src/styles/*.scss')
        .pipe(dartSass({
            outputStyle: 'compressed',
            includePaths: ['node_modules']
        }).on('error', dartSass.logError))
        .pipe(gulp.dest('./dist/css'));
}

function images() {
    return gulp.src('./src/images/**/*.{jpg,png,gif,svg,jpeg}')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'));
}

function scripts() {
    return gulp.src('./src/scripts/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
}

function htmlmini() {
    return gulp.src('./src/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            collapseInlineTagWhitespace: true
        }))
        .pipe(gulp.dest('./dist'));
}

export const build = gulp.series(styles, images, scripts, htmlmini);
export const watch = () => {
    gulp.watch('./src/styles/*.scss', styles);
    gulp.watch('./src/images/**/*.{jpg,png,gif,svg,jpeg}', images);
    gulp.watch('./src/scripts/*.js', scripts);
    gulp.watch('./src/*.html', htmlmini);
};

export default build;
