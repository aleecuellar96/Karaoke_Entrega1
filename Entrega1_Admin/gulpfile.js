var gulp = require('gulp');
var postcss = require('gulp-postcss');
var reporter = require('postcss-reporter');
var sass = require('gulp-sass');
var autoprefixer = require('autoprefixer');


/**
 * Builds single css file
 * Runs 'scss-lint' before compiling sass to css and creating it's corresponding
 * sourcemap
 */
gulp.task('build-css', function() {
  var sourcemaps   = require('gulp-sourcemaps');

  var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
  };

  var processors = [
    autoprefixer(),
    reporter({
      clearMessages: true
    })
  ];

  return gulp
    .src('sass/styles.scss')
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('styles/'))
});

/**
 * Watches for changes in sass files
 * Runs 'build-css' every time a sass file is changed
 */
gulp.task('watch', function() {
  return gulp
    .watch('./**/*.scss', ['build-css'])
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    })
});

/**
 * Builds production-ready files
 * Generates compressed and prefixed css without sourcemaps and sass
 * documentation
 */
gulp.task('prod', function () {

  var sassOptions = {
    errLogToConsole: false,
    outputStyle: 'compressed'
  };

  return gulp
    .src('sass/styles.scss')
    .pipe(sass(sassOptions))
    .pipe(autoprefixer())
    .pipe(gulp.dest('styles/'));
});

/**
 * Declare default tasks to run
 * Running 'gulp' in terminal will run first 'build-css' and then will run
 * 'watch'
 */
gulp.task('default', ['build-css', 'watch']);
