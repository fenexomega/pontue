/* File: gulpfile.js */

var dest  = 'public';
var src   = 'src';

// grab our packages
var gulp              = require('gulp');
var jshint            = require('gulp-jshint');
var uglify            = require('gulp-uglify');
var pump              = require('pump');
var webserver         = require('gulp-webserver');
var mainBowerFiles    = require('main-bower-files');
var concat            = require('gulp-concat');



gulp.task("bower-files", function(){
    gulp.src(mainBowerFiles()).pipe(gulp.dest(dest + "/lib"));
});

gulp.task('webserver', function() {
  gulp.src(dest)
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true
    }));
});

gulp.task('html', function(){
  gulp.src(src + '/**/*.html').pipe(gulp.dest(dest));
});

gulp.task('css',function(){
  gulp.src(mainBowerFiles('**/*.css'))
  .pipe(gulp.dest(dest))
  gulp.src(src + '/**/*.css').pipe(gulp.dest(dest));
});

gulp.task('js', function (cb) {
  pump([
        gulp.src(src + '/**/*.js'),
        // uglify().on('error',function(error){ console.log(error);}),
        gulp.dest(dest)
    ],
    cb
  );
});

gulp.task('default',['html','js','css','bower-files','webserver']);
