var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

// Compile sass into CSS & auto-inject into browsers
var sassTask = function(){
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sass()) // sass() run sass precompiling
        .pipe(gulp.dest("src/css")) // put compiled sass and put it into src/css folder
        .pipe(browserSync.stream()); // reload the browser
}

// Move the JavaScript files into the /src/js folder
var jsTask = function(){
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest("src/js")) // put js files into src/js folder
        .pipe(browserSync.stream()); // reload the browser
}

// static server + watching scss/html files
var serveTask = function(){
    browserSync.init({
        // lauches a localhost on port 3000, and it's going to watch the files 
        // listed below in an array
        server: "./src" 
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
    gulp.watch('src/*html').on('change', browserSync.reload);
}


gulp.task('sass', sassTask);
gulp.task('js', jsTask);
gulp.task('serve', ['sass'], serveTask );
gulp.task('default', ['js','serve']); 