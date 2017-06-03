var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var minify      = require('gulp-minify');

gulp.task('serve', function() {

    browserSync.init({
        proxy: "localhost/neighborhood-map/"
    });

    gulp.watch("sass/*.scss", ['sass']);
    gulp.watch("js/*.js", ['compress']);
    gulp.watch("js/**/*.js").on('change', browserSync.reload);
    gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('compress', function () {
  gulp.src('js/main.js')
    .pipe(minify ({
      ext: {
        min: '.min.js',
      },
      ignoreFiles: ['.min.js'],
    }))
    .pipe(gulp.dest('js'))
    .pipe(browserSync.stream());
});

gulp.task('sass', function() {
    return gulp.src("sass/*.scss")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest("css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);