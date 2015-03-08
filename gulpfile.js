var gulp = require('gulp');
var react = require('gulp-react');
var browserify = require('gulp-browserify');
var replace = require('gulp-replace');
var nodemon = require('gulp-nodemon');
var watch = require('gulp-watch');
var cache = require('gulp-cached');

gulp.task('react', function () {
    return gulp.src('react/**/*.jsx')
        .pipe(cache('jsx'))
        .pipe(react({harmony: true}))
        .pipe(replace(/^.*\bmodule.exports\b.*$/m, ''))
        .pipe(replace(/^.*require\(.*$/m, ''))
        .pipe(gulp.dest('public/js/'));
});

gulp.task('develop', function () {
  nodemon({ script: 'index.js', ext: 'js', ignore: ['public/', 'node_modules'] })
    .on('restart', function () {
      console.log('restarted!')
    })
});

gulp.task('watch', ['react'],function(){
  watch('react/**/*.jsx', function() {
   gulp.start('react');
 });
});

gulp.task('default', ['develop', 'watch']);

//
// gulp.task('browserify', function() {
//   gulp.src('react/*')
//     .pipe(react({harmony: true}))
//     .pipe(browserify({
//       // noParse: [
//       //   'react'
//       //   // require.resolve('./node_modules/react')
//       // ],
//       ignore: ['react']
//       // insertGlobals : true
//       // debug : !gulp.env.production
//     }))
//     .on('prebundle', function(bundle) {
//       // bundle.external('domready');
//       // bundle.external('react');
//     })
//     .pipe(gulp.dest('./public/js'));
// });
