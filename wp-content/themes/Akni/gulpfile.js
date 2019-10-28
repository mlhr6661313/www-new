const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const eslint = require('gulp-eslint');

const __dev = './frontend';
const __build = './public';

gulp.task('sass', function() {
  return gulp.src(`${__dev}/stylesheets/general.scss`)
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer({
        browsers: ['last 4 version', 'ie 8', 'ios 6', 'android 4']
      })
    ]))
    .pipe(gulp.dest(`${__build}/css`))
    .pipe(browserSync.stream());
});

gulp.task('js', function() {
  return gulp.src(`${__dev}/js/**/*.js`)
    .pipe(babel({
      presets: ['es2015', 'es2015-ie'],
      plugins: ['transform-es2015-modules-amd']
    }))
    .pipe(gulp.dest(`${__build}/js`))
    .pipe(browserSync.stream());
});

gulp.task('watch', function() {
  gulp.watch(`${__dev}/stylesheets/**/*.scss`, ['sass']);
  gulp.watch(`${__dev}/js/**/*.js`, ['js']);
});

gulp.task('browser-sync', function() {
  browserSync.init({
    proxy: "http://pershii.web/"
  });
});

gulp.task('lint', () => {

  return gulp.src(`${__dev}/js/**/*.js`)

    .pipe(eslint())

    .pipe(eslint.format())

    .pipe(eslint.failAfterError());
});


gulp.task('default', ['lint','sass', 'js', 'watch', 'browser-sync']);