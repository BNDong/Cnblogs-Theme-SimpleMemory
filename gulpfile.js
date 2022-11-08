const gulp = require('gulp');
const minifycss = require('gulp-minify-css');
const uglify = require('gulp-uglify');
const gzip = require('gulp-gzip');

gulp.task('minify-css', function () {
    return gulp.src('./src/style/simpleMemory.css')
        .pipe(minifycss())
        .pipe(gulp.dest('./dist'));
});

gulp.task('minify-js', function () {
    return gulp.src('dist/*.js')
        .pipe(uglify())
        .pipe(gzip())
        .pipe(gulp.dest('./dist'));
});

gulp.task('minify-script-js', function () {
    return gulp.src('dist/script/*.js')
        .pipe(uglify())
        .pipe(gzip())
        .pipe(gulp.dest('./dist/script/'));
});

gulp.task('default', gulp.series(['minify-css', 'minify-js', 'minify-script-js'], done => done()));
