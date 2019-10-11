const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
const axios = require('axios');

// const webpack = require('gulp-webpack');
const BASE_URL = 'http://localhost:1212/api';
const ampSourceOrigin = '?__amp_source_origin=http://localhost:1212';
const twig = require('gulp-twig');
const browserSync = require('browser-sync').create();
//const api = new API;
//console.log(api.getBanners());


gulp.task('css', () => {
    return gulp.src('src/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('html', async function(){
    //const cars = await axios.get(`${BASE_URL}/vehicles/dealers/2${ampSourceOrigin}`);
    const cars = [];

    return gulp.src('./src/*.html')
    .pipe(twig({
        errorLogToConsole: true,
        data : {
            cars : cars.data
        }
    }))
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream({match: '**/*.html'}));
});

gulp.task('src', () => {
    return gulp.src('src/src/**/*.*')
        .pipe(gulp.dest('./dist/src/'))
        .pipe(browserSync.stream({match: 'src/**/*.*'}));
});

gulp.task('serve', function() {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch('src/src/**/*.*', (done) => {
        gulp.series(['clean:src', 'src'])(done);
    });

    gulp.watch('src/*.scss', (done) => {
        gulp.series(['clean:css', 'css'])(done);
    });

    gulp.watch('src/**/*.html', (done) => {
        gulp.series(['clean:html', 'html'])(done);
    });

});

gulp.task('clean:src', () => {
    return del([
        './dist/src/**/*.*',
    ]);
});

gulp.task('clean:css', () => {
    return del([
        './dist/*.css',
    ]);
});

gulp.task('clean:html', () => {
    return del([
        './dist/*.html',
    ]);
});

gulp.task('default', gulp.series(['css','html','src','serve']));