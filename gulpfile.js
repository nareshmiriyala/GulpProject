var gulp = require('gulp');
var args = require('yargs').argv;
var del = require('del');
var wiredep = require('wiredep').stream;
var configs = require('./gulp.config.js')();
var $ = require('gulp-load-plugins')({lazy: true});
var port = process.env.PORT || configs.defaultPort;
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
gulp.task('styles', ['clean-styles'], function () {
    log('Compiling css-- less');
    return gulp.src(configs.less)
        .pipe($.plumber())
        .pipe($.less())
        .pipe($.autoprefixer({browsers: ['last 2 version', '>5%']}))
        .pipe(gulp.dest(configs.temp));

});
gulp.task('clean-styles', function () {
    var files = configs.temp + '**/*.css';
    clean(files);
});
gulp.task('style-watch', function () {
    gulp.watch([configs.less], ['styles']);
});
gulp.task('wiredep',['style-watch'], function () {
    var options = configs.wiredepDefaultOptions();
    return gulp.src(configs.index)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(configs.jsdir)))
        .pipe(gulp.dest(configs.client));
});

gulp.task('serve-dev', ['wiredep'], function () {
    var isDev = true;
    var nodeOptions = {
        script: configs.nodeServer,
        delayTime: 1,
        env: {
            'PORT': port,
            'NODE_ENV': isDev ? 'dev' : 'build'
        },
        watch: [configs.server]
    };
    return $.nodemon(nodeOptions);
})
function clean(path) {
    log('Cleaning' + $.util.colors.blue(path));
    del(path);
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
