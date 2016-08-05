const gulp = require('gulp');
const gutil = require('gulp-util');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');

gulp.task('test', function(){
	console.log("Hello there... your GULPJS is working!");
});

/* Log on change */
gulp.task('log-sass', function(){
	gutil.log(gutil.colors.red("Change Detected: SCSS"));
});


gulp.task('log-html', function(){
	gutil.log(gutil.colors.red('Change Detected: HTML'));
});

gulp.task('sass', function(){
	gutil.log(gutil.colors.red("Converting SASS|SCSS to CSS..."));
	return gulp.src('app/sass/**/*.sass')
		.pipe(sass())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('pug', function(){
	gutil.log(gutil.colors.red("Converting Pug to HTML..."));
	return gulp.src('app/**/*.pug')
		.pipe(pug())
		.pipe(gulp.dest('app/'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

//TODO Change baseDir appropriately
gulp.task('browserSync', function(){
	browserSync.init({
		server: {
			baseDir: 'app' 
		},
	});
});

gulp.task('watch', ['browserSync'], function(){
	//on file change - run sass task
	gulp.watch('app/sass/**/*.sass', ['log-sass', 'sass']);
  gulp.watch('app/**/*.pug', ['pug', browserSync.reload]);
});


