/*ignore this file.... JUST FOR REFERENCE to comments*/

(function (){

	var source = require('vinyl-source-stream');
	// var streamify = require('gulp-streamify');
	var browserify = require('browserify');
	// var bundleJS = browserify('./source/js/lib.js').bundle();

	var gulp = require('gulp');
	var uglify = require('gulp-uglify');
	var concat = require('gulp-concat');
	var rename = require('gulp-rename');
	var sass = require('gulp-sass');
	var cleanCss = require('gulp-clean-css');
	var del = require('del');

	var postcss = require('gulp-postcss');
	var cssnext = require('postcss-cssnext');



	
	// var bundleCss = browserify('./source/css/lib.css').bundle();

	function logError(err){
		console.log(err.message);
		this.emit('end');
	}


/**
 * Wrap gulp streams into fail-safe function for better error reporting
 * Usage:
 * gulp.task('less', wrapPipe(function(success, error) {
 *   return gulp.src('less/*.less')
 *      .pipe(less().on('error', error))
 *      .pipe(gulp.dest('app/css'));
 * }));
 */

function wrapPipe(taskFn) {
  return function(done) {
    var onSuccess = function() {
      done();
    };
    var onError = function(err) {
      done(err);
    }
    var outStream = taskFn(onSuccess, onError);
    if(outStream && typeof outStream.on === 'function') {
      outStream.on('end', onSuccess);
    }
  }
}

/***************** 
************		development build
*****************/



	/* task for bundling JS libraries via ES6 modules*/

	gulp.task('bundleJS', function() {
		var bundleStream = browserify('./source/js/vendor/lib.js').bundle();

	    return bundleStream
	        //Pass desired pretend filename to vinyl-source-stream
	        .pipe(source('bundle.js'))
	        //Rename it to desired output filename
		    .pipe(rename('lib.js'))
	        // Start piping stream to tasks!
	        .pipe(gulp.dest('./dist/js/'));
	});

	/*

	gulp.task('cleanlibjs',['bundleJS'], function () {
	  return del([
	    './source/js/lib.js'
	  ]);
	});

*/

	/* task for bundling CSS libraries via ES6 modules*/
/*
	gulp.task('bundleCSS', wrapPipe(function(success, error) {
			var bundleStream = browserify('./source/css/lib.css.js')
								.transform(require('browserify-css'), {
							        rootDir: '.',
							        minify: true,
							        autoInject:true,
							        onFlush: function(options, done) {
							            
							            // Do not embed CSS into a JavaScript bundle
							            console.log(options.data);
							            done('module.exports = ' + JSON.stringify(options.data) + ';');
							        }
							    }).bundle().on('error', error);
	
		    return bundleStream
		        //Pass desired pretend filename to vinyl-source-stream
		        .pipe(source('bundle.css').on('error', error))
		        //Rename it to desired output filename
			    .pipe(rename('lib').on('error', error))
		        // Start piping stream to tasks!
		        .pipe(gulp.dest('./dist/css/',{ext:'.css'}));
		}));

*/


	/* task for bundling JS files*/
	gulp.task('js',['bundleJS'], function(){ 
	        return gulp.src(['source/js/*.js', 'app/**/*.js'])
	        .pipe(concat('app.js'))
	        .pipe(gulp.dest('dist/js/'));
	});

	/* task for sass files*/

/*	
	gulp.task('sass', function(){ 
	        return gulp.src(['source/css/*.scss'])
	        .pipe(sass())
	        .pipe(gulp.dest('source/css/',{ext:'.css'}));
	});

*/
	



	/* task for sass/css files*/
	gulp.task('css',['cssLibs'], wrapPipe(function(success,error){ 
				var postcssPlugins = [
			        cssnext({browsers: ['last 1 version']})
			    ];				

		        return gulp.src(['source/sass/*.scss'])
		        .pipe(sass())
		        .pipe(concat('style.css'))
		        .pipe(postcss(postcssPlugins).on('error', error))
		        .pipe(gulp.dest('dist/css/'));

	}));

	/* task for css libs */
	gulp.task('cssLibs', wrapPipe(function(success,error){ 
		        return gulp.src(['source/css/libs/*.css'])
		        .pipe(concat('lib.css'))
		        .pipe(gulp.dest('dist/css/'));

	}));







/***************** 
************		distribution build
*****************/

	gulp.task('bundleJS:dist', wrapPipe(function(success,error) {
			var bundleStream = browserify('./source/js/vendor/lib.js').bundle();
	
		    return bundleStream
		        //Pass desired pretend filename to vinyl-source-stream
		        .pipe(source('bundle.js'))
		        //Rename it to desired output filename
			    .pipe(uglify().on('error', error))
			    .pipe(rename('lib.js'))
		        // Start piping stream to tasks!
		        .pipe(gulp.dest('./dist/js/'));
		}));

	gulp.task('js:dist',['bundleJS:dist'], function(){ 
	        return gulp.src(['source/js/*.js', 'app/**/*.js'])
	        .pipe(concat(
	        	'app.js'
	        ))
	        .pipe(uglify())
	        .pipe(gulp.dest('dist/js/'));

	});

	
	gulp.task('css:dist',['cssLibs:dist'], function(){ 
			var postcssPlugins = [
		        cssnext({browsers: ['last 3 version']})
		    ];
	        
	        return gulp.src(['source/css/*.scss'])
	        .pipe(concat('style.scss'))
	        .pipe(sass())
	        .pipe(postcss(postcssPlugins))
	        .pipe(cleanCss())
	        .pipe(gulp.dest('dist/css/'));
	});

	gulp.task('cssLibs:dist', function(){ 
		return gulp.src(['source/css/libs/*.css'])
	        .pipe(concat('lib.css'))
	        .pipe(cleanCss())
	        .pipe(gulp.dest('dist/css/'));
	});



/******
		=DEFAULT TASK
******/

	gulp.task('default', ['js']);


}());