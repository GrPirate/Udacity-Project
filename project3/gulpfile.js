var gulp = require('gulp');
var browserify = require('browserify');
var sequence = require('run-sequence');
var watchify = require('watchify'); // 监听文件变化
var uglify = require('gulp-uglify'); // 代码压缩，脏化代码
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gif = require('gulp-if');
var minimist = require('minimist');
var fs = require('fs');

var knownOptions = {
  string: 'env',
  default: { env: process.env.NODE_ENV || 'production' }// 默认为生产环境
};

var options = minimist(process.argv.slice(2), knownOptions);
var isProduction = options.env === 'production'; // process：node中预定义的变量，可以通过它获取当前进程中的所有信息。env：进程中的环境变量
gulp.task('default', function () { // gulp默认任务
    // shelljs.exec('browserify jasmine/spec/feedreader.js -o js/main.js');
    // sequence('mainjs', 'watch');
    sequence('mainjs');
});

gulp.task('mainjs', function () {
    var b = browserify({
        entries: ['jasmine/spec/index.js'],
        cache: {},
        packageCache: {},
        // plugin: [watchify]
        plugin: isProduction?[]:[watchify]
    });
    var bundle = function () {
        b
            .bundle()
            .pipe(source('main.js'))
            .pipe(buffer())
            .pipe(gif(isProduction, uglify()))
            .pipe(gulp.dest('./js/'));
    }
    bundle();
    b.on('update', bundle)
});

// gulp.task('watch', function () {
//     gulp.watch(['jasmine/spec/*.js'],function(){
//         sequence('mainjs');
//     })
// })