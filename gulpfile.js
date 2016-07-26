const gulp = require('gulp');
const gutil = require('gulp-util');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

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
	gulp.watch('app/*.html', ['log-html', browserSync.reload]);
});


