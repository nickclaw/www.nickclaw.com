var gulp = require('gulp'),
	gutil = require('gulp-util'),
	uglify = require('gulp-uglify')
	sass = require('gulp-sass'),
	concat = require('gulp-concat')
	es = require('event-stream')
	imagemin = require('gulp-imagemin')
	clean = require('gulp-clean');

// compile everything for production
gulp.task('default', function(){
	gulp.run('clean', function() {
		gulp.run('js', 'css', 'images', 'html', function() {});
	});
});

// run once then watch for changes
gulp.task('watch', function() {
	gulp.watch('./src/static/js/**', function(evt) {
		console.log('File: ' + evt.path + ' was ' + evt.type + '. Compiling javascript');
		gulp.run('js');
	});

	gulp.watch('./src/static/css/**', function(evt) {
		console.log('File: ' + evt.path + ' was ' + evt.type + '. Compiling scss');
		gulp.run('css');
	});

	gulp.watch('./src/static/image/**', function(evt) {
		console.log('File: ' + evt.path + ' was ' + evt.type + '. Optimizing images');
		gulp.run('images');
	});

	gulp.watch('./src/views/**', function(evt) {
		console.log('File: ' + evt.path + ' was ' + evt.type + '. Optimizing views');
		gulp.run('html');
	});
});

/**
 * empties the build folder
 */
gulp.task('clean', function() {
	gulp.src('./build/*', { read : false })
		.pipe(clean({ force : true }));
});

/**
 * uglifies local files and concatenates them to the external files
 * outputs ./build/static/js/script.js
 */ 
gulp.task('js', function() {
	es.concat(
			gulp.src('./src/static/js/external/*.js')
				.pipe(concat('externals.js')),

			gulp.src('./src/static/js/*.js')
				.pipe(uglify())
				.pipe(concat('locals.js'))
		)
		.pipe(concat('script.js'))
		.pipe(gulp.dest('./build/static/js/'));
});

/**
 * compiles main.css and noscript.css
 * outputs to ./build/static/css/
 */
gulp.task('css', function() {
	es.concat(
		gulp.src('./src/static/css/main.scss'),
		gulp.src('./src/static/css/noscript.scss')
	)
	.pipe(sass({
		includePaths : ['./src/static/css'],
		outputStyle : 'compressed'
	}))
	.pipe(gulp.dest('./build/static/css/'))
});

/**
 * minimizes all images
 * outputs to ./build/static/image/
 */
gulp.task('images', function() {
	gulp.src('./src/static/image/**')
		.pipe(imagemin())
		.pipe(gulp.dest('./build/static/image/'));
});

gulp.task('html', function() {
	gulp.src('./src/views/**')
		.pipe(gulp.dest('./build/views/'));
});