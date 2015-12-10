var source = require('vinyl-source-stream')
var gulp = require('gulp')
var browserify = require('browserify')
var babelify = require('babelify')
var watchify = require('watchify')
var notify = require('gulp-notify')

var rename = require('gulp-rename')
var buffer = require('vinyl-buffer')

var server = require('gulp-server-livereload')

var postcss = require('gulp-postcss')
var autoprefixer = require('autoprefixer')
var precss = require('precss')
var concat = require('gulp-concat')
var path = require('path')

var BUILD_FOLDER = path.join(__dirname, 'build')
var ENTRY_POINT = path.join(__dirname, 'src', 'app.js')

var bundler = watchify(browserify(ENTRY_POINT)).transform(babelify)

function bundle() {
  return bundler
    .bundle()
    .on('error', handleErrors)
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(BUILD_FOLDER))
}

bundler.on('update', bundle)

gulp.task('build', function () {
  bundle()
})

gulp.task('serve', function () {
  gulp.src('')
    .pipe(server({
      livereload: {
        enable: true,
        filter: function (filePath, cb) {
          if (/bundle.js/.test(filePath) || /templates.js/.test(filePath)) {
            cb(true)
          } else if (/style.css/.test(filePath)) {
            cb(true)
          }
        }
      },
      open: true
    }))
})

gulp.task('bfy', ['replace-config'], function () {
  return browserify(ENTRY_POINT)
    .transform(babelify)
    .bundle()
    .pipe(source('bundle.js'))
    //.pipe(streamify(uglify()))
    .pipe(gulp.dest(BUILD_FOLDER))
})


function handleErrors() {
  var args = Array.prototype.slice.call(arguments)
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args)
  this.emit('end')
}

gulp.task('watch', function () {
  gulp.watch('./src/**/*.scss', ['style'])
})

gulp.task('default', ['build', 'serve', 'style', 'watch'])

gulp.task('style', function () {
  gulp.src('./src/**/*.scss')
    .pipe(postcss([
      autoprefixer({browsers: ['last 2 versions']}),
      precss
    ]))
    .pipe(concat('style.css'))
    .pipe(gulp.dest(BUILD_FOLDER))
})
