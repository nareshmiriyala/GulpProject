var gulp = require('gulp');
var args = require('yargs').argv;
var configs = require('./gulp.config.js')();
var $ = require('gulp-load-plugins')({lazy: true});

// var jshint = require('gulp-jshint');
// var jscs = require('gulp-jscs');
// var util = require('gulp-util');
// var gulpprint = require('gulp-print');
// var gulpif = require('gulp-if');
gulp.task('vet', function () {
    log('Logging jshint and jscs');
    gulp.src(configs.alljs).pipe($.jscs())
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {verbose: 'true'}))
        .pipe($.jshint.reporter('fail'));
});
gulp.task('styles', function () {
    log('Compiling css-- less');
    return gulp.src(configs.less)
        .pipe($.less())
        .pipe($.autoprefixer({browsers: ['last 2 version', '>5%']}))
        .pipe(gulp.dest(configs.temp));

});
function clean(path) {
    log('Cleaning' + $.util.colors.blue(path));
}
function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));

    }
}
