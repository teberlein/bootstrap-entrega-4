const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browsersync = require('browser-sync').create();
const del = require('del');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const usemin = require('gulp-usemin');
const rev = require('gulp-rev');
const cleanCss = require('gulp-clean-css');
const flatmap = require('gulp-flatmap');
const htmlmin = require('gulp-htmlmin'); 

// Sass Task
function scssTask(){
    return src('./css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('./css'));
}

//JS Task
function jsTask(){
    return src('app/js/script.js', { sourcemaps: true })
        .pipe(terser())
        .pipe(dest('dist', { sourcemaps: '.' }));
}

// Browsersync Tasks
function browsersyncServe(cb){
  browsersync.init({
    server: {
      baseDir: '.'
    }
  });
  cb();
}

function browsersyncReload(cb){
  browsersync.reload();
  cb();
}

// Watch Task
function watchTask(){
  watch('*.html', browsersyncReload);
  watch(['./css/*.scss'], series(scssTask, browsersyncReload));
}

//Clean task
function cleanTask() {
    return del(['dist']);
};

//Image min task
function imageminTask() {
    return src(['./images/*.jpg', './images/*.png', './images/*.gif', './images/*.jpeg'])
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(dest('dist/images'));
};

//Use min task
function useminTask() {
    return src('./*.html')
        .pipe(flatmap(function(stream,file) {
            return stream
            .pipe(usemin({
                css: [rev()],
                html: [function() { return htmlmin({collapseWhitespace: true}) }],
                js: [uglify(), rev()],
                inlinejs: [uglify()],
                inlinecss: [cleanCss(), 'concat'],
            }));
        }))
        .pipe(dest('dist/'));

        //flat map allows us to process in paralel
};

//Copy fonts task

function copyfontsTask() {
    return src('./node_modules/bootstrap-icons/**/*.{ttf,woff,eof,svg,eot,otf}*')
    .pipe(dest('./dist/fonts'));
}

// Default Gulp task
exports.default = series(
  scssTask,
  browsersyncServe,
  watchTask
);

//Gulp build task
exports.build = series(
    copyfontsTask,
    cleanTask,
    imageminTask,
    useminTask
);