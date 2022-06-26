import gulp from 'gulp';
import clean from 'gulp-clean';
import concat from 'gulp-concat';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import cleanCSS from'gulp-clean-css';
import minifyjs from 'gulp-js-minify';
import browserSync from 'browser-sync';
import autoprefixer from 'gulp-autoprefixer';
import imagemin from 'gulp-imagemin';


const sass = gulpSass(dartSass);
const browserSyncInstans = browserSync.create();

export const cleanDist = () => gulp.src('./dist/*', {read: false})
                                .pipe(clean());
export const compileCss = () => gulp.src('./src/scss/**/*.scss')
                                .pipe(sass())
                                .pipe(autoprefixer({cascade: false}))
                                .pipe(cleanCSS({compatibility: 'ie8'}))
                                .pipe(gulp.dest('./dist/css'));
export const conpileJs = () => gulp.src('./src/**/*.js')
                                .pipe(concat('scripts.min.js'))
                                .pipe(minifyjs())
                                .pipe(gulp.dest('./dist/js/'));
export const minimizeImg = () => gulp.src('./src/img/*')
                                .pipe(imagemin())
                                .pipe(gulp.dest('./dist/img/'));

export const build = gulp.series(cleanDist, gulp.parallel(compileCss, conpileJs, minimizeImg));

export const dev = () => {
    browserSyncInstans.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./src/**/*', gulp.series(build, (done) => {
        browserSyncInstans.reload();
        done();
    }));
    gulp.watch('./*.html', (done) => {
        browserSyncInstans.reload();
        done();
    });
};




