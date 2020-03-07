var   gulp        = require('gulp'),
      sass        = require('gulp-sass'),
      merge       = require('merge-stream'),
      concat      = require('gulp-concat'),
      cleanCss    = require('gulp-clean-css'),
      sourcemaps  = require('gulp-sourcemaps'),
      uglify      = require('gulp-uglify'),
      autoprefixer = require('gulp-autoprefixer');

      /*
      rename      = require('gulp-rename'),
      cssmin      = require('gulp-cssnano'),
      plumber     = require('gulp-plumber'),
      notify      = require('gulp-notify'),
      sassLint    = require('gulp-sass-lint'),
      */
     // File paths
     const publicSassSources = [
        'assets/sass/argentum-post-status.scss',
        ];
     const publicJsSourcesHeader = [
      'assets/js/argentum-post-status-script.js',
      'assets/js/argentum-post-status-block.js']; 

       
    function publicCssTask() {
     
     var sassStream = gulp
      .src(publicSassSources)
      .pipe(sass())
      .pipe(concat('sass-files.css'));
           
      return sassStream
         .pipe(sourcemaps.init())
         .pipe(autoprefixer())
         .pipe(concat('style.css'))
         //.pipe(cleanCss())
         .pipe(sourcemaps.write('.'))
         .pipe(gulp.dest('.'));
    }

    
   function publicJsTaskHeader()
    {
      return gulp.src(publicJsSourcesHeader)
         .pipe(concat('argentum-post-status.js'))
         .pipe(uglify())
         .pipe(gulp.dest('./js')
     );

   }
   

   function publicJsTaskHeaderDev()
    {
      return gulp.src(publicJsSourcesHeader)
         .pipe(concat('argentum-post-status.js'))
         .pipe(gulp.dest('./js')
     );

   }
exports.default = gulp.series(gulp.parallel(publicCssTask, publicJsTaskHeader));
exports.dev = gulp.series(gulp.parallel(publicCssTask,publicJsTaskHeaderDev));
