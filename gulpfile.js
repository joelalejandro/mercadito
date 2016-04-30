var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var connect = require('gulp-connect');
var inject = require('gulp-inject');
var del = require('del');
var debug = require('gulp-debug');
var mainBowerFiles = require('main-bower-files');
var filter = require('gulp-filter');
var gutil = require('gulp-util');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var copy = require('gulp-copy');

var sources = {
  app: {
    styles: 'src/styles/*.scss',
    scripts: 'src/scripts/**/*.js',
    templates: 'src/templates/**/*.html',
    images: 'src/images/*',
    chicoAssets: 'bower_components/chico/dist/assets/*'
  },
  inject: ['dist/css/vendor.css', 'dist/css/app.css', 'dist/js/vendor.js', 'dist/js/app.js']
}

var output = {
  vendor: {
    dir: 'dist',
    styles: {
      dir: 'css',
      file: 'vendor.css'
    },
    scripts: {
      dir: 'js',
      file: 'vendor.js'
    }
  },
  app: {
    dir: 'dist',
    styles: {
      dir: 'css',
      file: 'app.css'
    },
    scripts: {
      dir: 'js',
      file: 'app.js'
    }
  }
};

gulp.task('vendor-styles', function() {
  return gulp.src(mainBowerFiles())
        .pipe(filter(['**/*.css', '!**/*.min.css', '!bower_components/chico/dist/mobile/*']))
        .pipe(debug({ title: 'vendor-style.src:' }))
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(concat(output.vendor.styles.file))
        .pipe(gulp.dest(output.vendor.dir + '/' + output.vendor.styles.dir))
        .pipe(connect.reload());
});

gulp.task('vendor-scripts', function() {
  return gulp.src(mainBowerFiles())
        .pipe(filter(['**/*.js', '!**/*.min.js', '!bower_components/tiny.js/tiny.js', '!bower_components/chico/dist/mobile/*']))
        .pipe(debug({ title: 'vendor-script.src:' }))
        .pipe(sourcemaps.init())
        .pipe(uglify().on('error', gutil.log))
        .pipe(sourcemaps.write())
        .pipe(concat(output.vendor.scripts.file))
        .pipe(gulp.dest(output.vendor.dir + '/' + output.vendor.scripts.dir))
        .pipe(connect.reload());
});

gulp.task('app-styles', function() {
  return gulp.src(sources.app.styles)
        .pipe(debug({ title: 'app-style.src:' }))
        .pipe(sass())
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(concat(output.app.styles.file))
        .pipe(gulp.dest(output.app.dir + '/' + output.app.styles.dir))
        .pipe(connect.reload());
});

gulp.task('app-scripts', function() {
  return browserify({entries: './src/scripts/main.js', debug: true})
        .transform("babelify", { presets: ["es2015"] })
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(debug({ title: 'app-script.src:' }))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(output.app.dir + '/' + output.app.scripts.dir))
        .pipe(connect.reload());
});

gulp.task('app-templates', ['build-vendor', 'app-scripts', 'app-styles'], function() {
  return gulp.src(sources.app.templates)
        .pipe(debug({ title: 'app-template.src:' }))
        .pipe(inject(gulp.src(sources.inject, { read: false }), { ignorePath: 'dist' }))
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true })) 
        .pipe(gulp.dest(output.app.dir))
        .pipe(connect.reload());
});

gulp.task('clean', function() {
  return del(['dist']);
})

gulp.task('build-vendor', ['vendor-scripts', 'vendor-styles']);
gulp.task('build-app', ['app-scripts', 'app-styles', 'app-templates']);
gulp.task('build', ['build-vendor', 'build-app', 'copy-images', 'copy-chico-assets']);

gulp.task('watch', function() {
  gulp.watch(mainBowerFiles(), ['vendor-scripts', 'vendor-styles']);
  gulp.watch([sources.app.scripts], ['app-scripts']);
  gulp.watch([sources.app.styles], ['app-styles']);
  gulp.watch([sources.app.templates], ['app-templates']);
});

gulp.task('copy-images', function() {
  return gulp.src(sources.app.images).pipe(copy('dist/images', { prefix: 2 }));
});

gulp.task('copy-chico-assets', function() {
  return gulp.src(sources.app.chicoAssets).pipe(copy('dist/assets', { prefix: 4 }));
})


gulp.task('serve', ['build', 'watch'], function() {
  connect.server({
    root: ['dist'],
    livereload: true
  })
});

gulp.task('default', ['serve']);