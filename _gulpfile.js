// generated on 2018-09-06 using generator-webapp 3.0.1
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync').create();
const del = require('del');
const wiredep = require('wiredep').stream;
const runSequence = require('run-sequence');

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

let dev = true;

gulp.task('styles', () => {
  return gulp.src('app/styles/*.scss')
    .pipe($.plumber())
    .pipe($.if(dev, $.sourcemaps.init()))
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe($.if(dev, $.sourcemaps.write()))
    .pipe(gulp.dest('app/styles'))
    .pipe(reload({stream: true}));
});

gulp.task('serve', () => {
  runSequence(['styles'], () => {
    browserSync.init({
      notify: false,
      port: 9000,
      server: {
        baseDir: ['app']
      }
    });

    gulp.watch([
      'app/*.html',
      'app/scripts/*.js',
    ]).on('change', reload);

    gulp.watch('app/styles/**/*.scss', ['styles']);
  });
});

