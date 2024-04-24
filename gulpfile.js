const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');

function styles() {
    return gulp.src('./src/styles/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))  // Adicionado tratamento de erro para o Sass
        .pipe(gulp.dest('./dist/css'))
        .on('end', function() {
            console.log('Estilos processados com sucesso!');
        });
}

function images() {
    return gulp.src('./src/images/**/*')
        .pipe(imagemin())
        .on('error', function(err) {
            console.error(err.toString());
            this.emit('end');
        })
        .pipe(gulp.dest('./dist/images'))
        .on('end', function() {
            console.log('Imagens processadas com sucesso!');
        });
}

function scripts() {
    return gulp.src('./src/scripts/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
        .on('end', function() {
            console.log('Scripts processados com sucesso!');
        });
}

function htmlmini() {
    return gulp.src('./src/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            collapseInlineTagWhitespace: true
        }))
        .pipe(gulp.dest('./dist'))
        .on('end', function() {
            console.log('HTML minificado com sucesso!');
        });
}

exports.default = gulp.parallel(styles, images, scripts, htmlmini);
exports.watch = function() {
    gulp.watch('./src/styles/*.scss', gulp.parallel(styles))
    gulp.watch('./src/scripts/*.js', gulp.parallel(scripts))
    gulp.watch('./src/*.html', gulp.parallel(htmlmini))
}
