// MODULES LOAD {{{
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    minify = require('gulp-minify-css'),
    prefix = require('gulp-autoprefixer'),
    connect = require('gulp-connect'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    pixrem = require('gulp-pixrem');
// }}}
// COMPONENTS SOURCES {{{
jsSources = ['components/scripts/*.js'];
sassMain = ['components/sass/styles.scss'];
sassSources = ['components/sass/*.scss'];
htmlSources = ['build/*.html'];
imageSources = ['components/images/*'];
// }}}
// WEBSERVER TASK {{{
gulp.task('webserver', function() {
    connect.server({
        root: 'build',
        livereload: true
    });
});
// }}}
// JAVASCRIPT TASK {{{
gulp.task('javascript', function() {
    gulp.src(jsSources)
        .pipe(concat('custom.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('build/js'))
        .pipe(connect.reload());
});
// }}}
// HTML TASK {{{
gulp.task('html', function() {
    gulp.src(htmlSources)
        .pipe(connect.reload());
});
// }}}
// SASS TASK {{{
gulp.task('sass', function() {
    gulp.src(sassMain)
        .pipe(sass({style: 'expanded'}).on('error', gutil.log))
        .pipe(prefix("last 3 versions", "ie 8", "ie 9"))
        .pipe(pixrem('10px'))
        //.pipe(minify())
        .pipe(gulp.dest('build/css'))
        .pipe(connect.reload());
});
// }}}
// IMAGES TASK {{{
gulp.task('images', function () {
    gulp.src(imageSources)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('build/images'));
});
// }}}
// WATCH TASK {{{
gulp.task('watch', function() {
	gulp.watch(sassSources, ['sass']);
	gulp.watch(jsSources, ['javascript']);
	gulp.watch(htmlSources, ['html']);
    gulp.watch(imageSources, ['images']);
});
// }}}
// DEFAULT TASK {{{
gulp.task('default', ['webserver', 'watch', 'html', 'javascript', 'sass', 'images']);
// }}}
