const gulp = require('gulp');
const less = require('gulp-less');
const cleanCSS = require('gulp-clean-css');

gulp.task('minify-css', function() {
    return new Promise(function(resolve, reject) {
      gulp.src('./src/assets/styles/index.less')
        .pipe(less())
        .pipe(cleanCSS())
        .pipe(gulp.dest('./src/assets/styles/minify'))
        .on('end', resolve)
        .on('error', reject);
    });
});
