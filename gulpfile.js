/* File: gulpfile.js */

var dest  = 'public';
var src   = 'src';

// grab our packages
var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var pump = require('pump');



gulp.task('html', function(){
  gulp.src(src + '/**/*.html').pipe(gulp.dest(dest));
});

gulp.task('css',function(){
  gulp.src(src + '/**/*.css').pipe(gulp.dest(dest));
});

gulp.task('js', function (cb) {
  pump([
        gulp.src(src + '/**/*.js'),
        uglify(),
        gulp.dest(dest)
    ],
    cb
  );
});

gulp.task('default',['html','js','css']);
