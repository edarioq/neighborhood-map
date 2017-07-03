var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var del = require('del');
var runSequence = require('run-sequence');

/*
 * Development tasks
 */

// Run a server and point to working directory
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  }, function() {
    console.log('Running local server on port 3000');
  })
})

// Compiles SASS to CSS and watch for changes
gulp.task('sass', function() {
  return gulp.src('app/sass/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Watch for changes and reload browser
gulp.task('watch', ['browserSync', 'sass'], function(){
  gulp.watch('app/sass/**/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload); 
  gulp.watch('app/js/**/*.js', browserSync.reload);  
})

/*
 * Production ready tasks
 */

// Clean up files not being used in dist folder
gulp.task('clean:dist', function() {
  return del.sync('dist');
})

// Send production rdy HTML, CSS, and JS to dist folder
gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

// Send fonts to dist folder
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
})

// Run: Development environment
gulp.task('default', function(callback) {
  runSequence(['sass', 'browserSync'], 'watch',
    callback
  )
})

// Run: Distribution folder
gulp.task('build', function(callback) {
  runSequence(
    'clean:dist',
    'sass',
    ['useref', 'fonts'],
    callback
  )
})