(function (){

	var source = require('vinyl-source-stream');
	var streamify = require('gulp-streamify');
	var browserify = require('browserify');
	// var bundleJS = browserify('./source/js/lib.js').bundle();

	var gulp = require('gulp');
	var uglify = require('gulp-uglify');
	var concat = require('gulp-concat');
	var rename = require('gulp-rename');
	var sass = require('gulp-sass');
	var cleanCss = require('gulp-clean-css');
	var flatten = require('gulp-flatten');
	var del = require('del');
	var sourcemaps = require('gulp-sourcemaps');
	// var ff = require('node-find-folder');

	var plumber = require('gulp-plumber');
	var eslint = require('gulp-eslint');
	var htmltidy = require('gulp-htmltidy');
	var chtml = require('clean-html');
	var htmlbeautify = require('gulp-html-beautify');
	var angularify = require('gulp-angular-htmlify');
	var html5Lint = require('gulp-html5-lint');
	var htmllint = require('gulp-htmllint');
	var csslint = require('gulp-csslint');
	var gutil = require('gulp-util');

	var browserSync = require('browser-sync');

	var postcss = require('gulp-postcss');
	var cssnext = require('postcss-cssnext');



var onError = function(err) {
  gutil.beep();
  console.log(err);
}
 
function swallowError (error) {

  // If you want details of the error in the console
  console.log(error.toString())
  this.emit('end')
}

	/**********
	********		=js 
	**********/

		/* =common */	

	gulp.task('vendorJS', function() {
			var sourceFile = gulp.src([ './source/js/vendor/**/*.js',
										'!./source/js/vendor/lib.js']);
	
		    return sourceFile
		    	.pipe(plumber({
					errorHandler: onError
				}))
		        //Pass desired pretend filename to vinyl-source-stream
		        .pipe(concat('vendor.js'))
		        // .pipe(uglify())
		        .pipe(gulp.dest('./dist/js/'));
		});

		/* =dev */

	//task for bundling JS libraries via ES6 modules
	gulp.task('bundleJS', function() {
			var bundleStream = browserify('./source/js/vendor/lib.js').bundle();
	
		    return bundleStream
		    	.pipe(plumber({
					errorHandler: onError
				}))
		        //Pass desired pretend filename to vinyl-source-stream
		        .pipe(source('libraries.js'))
		        //Rename it to desired output filename
			    .pipe(rename('lib.js'))
		        // Start piping stream to tasks!
		        .pipe(gulp.dest('./dist/js/'));
		});

	// task for bundling JS files and write to single js file
	gulp.task('js',['bundleJS','vendorJS'],function(){ 
		        return gulp.src(['app/modules/**/*.module.js',
		        				'app/**/*.module.js','app/**/*.route.js',
		        				'app/**/*.js','source/js/main.js'])
		        .pipe(plumber({
					errorHandler: onError
				}))
				.pipe(sourcemaps.init())
		        .pipe(concat('app.js'))
		        .pipe(sourcemaps.write())
		        .pipe(eslint())
		        // eslint.format() outputs the lint results to the console. 
		        // Alternatively use eslint.formatEach() (see Docs). 
		        .pipe(eslint.formatEach())
		        // To have the process exit with an error code (1) on 
		        // lint error, return the stream and pipe to failAfterError last. 
		        // .pipe(eslint.failAfterError())
		        .pipe(gulp.dest('dist/js/'))
		        .pipe( browserSync.reload({stream:true}) );
	});

	gulp.task('js:watch',function(){ 
		        return gulp.src(['app/modules/**/*.module.js',
		        				'app/**/*.module.js','app/**/*.route.js',
		        				'app/**/*.js','source/js/main.js'])
		        .pipe(plumber({
					errorHandler: onError
				}))
				.pipe(sourcemaps.init())
		        .pipe(concat('app.js'))
		        .pipe(sourcemaps.write())
		        .pipe(eslint())
		        // eslint.format() outputs the lint results to the console. 
		        // Alternatively use eslint.formatEach() (see Docs). 
		        .pipe(eslint.formatEach())
		        // To have the process exit with an error code (1) on 
		        // lint error, return the stream and pipe to failAfterError last. 
		        // .pipe(eslint.failAfterError())
		        .pipe(gulp.dest('dist/js/'))
		        .pipe( browserSync.reload({stream:true}) );
	});
	

		/* =dist */

	// task for bundling JS libraries via ES6 modules for distribution build  
	gulp.task('bundleJS:dist',function() {
			var bundleStream = browserify('./source/js/vendor/lib.js').bundle();
	
		    return bundleStream
		    	.pipe(plumber({
					errorHandler: onError
				}))
		        //Pass desired pretend filename to vinyl-source-stream
		        .pipe(source('bundle.js'))
			    .pipe(streamify(uglify()))
		        //Rename it to desired output filename
			    .pipe(rename('lib.js'))
		        // Start piping stream to tasks!
		        .pipe(gulp.dest('./dist/js/'));
		});

	// task for bundling JS files and write to single js file for distribution build  
	gulp.task('js:dist',['bundleJS:dist','vendorJS'], function(){ 
		        return gulp.src(['app/modules/**/*.module.js',
		        				'app/**/*.module.js','app/**/*.route.js',
		        				'app/**/*.js','source/js/main.js'])
		        .pipe(plumber({
					errorHandler: onError
				}))
		        .pipe(concat('app.js'))
		        .pipe(uglify())
		        .pipe(gulp.dest('dist/js/'));
	
		});




	/**********
	********		=html and =views
	**********/


	// ,
	// './app/**/!(*.compiled).php',
	// './!(*.compiled).php'

	gulp.task('html',function(){
		var sourceFile = 
		['./app/**/!(*.compiled).html',
		'./!(*.compiled).html'];

		var options = {
		    "indent_size": 4,
		    "indent_char": "	",
		    "eol": "\n",
		    "indent_level": 0,
		    "indent_with_tabs": true,
		    "preserve_newlines": true,
		    "max_preserve_newlines": 10,
		    "jslint_happy": false,
		    "space_after_anon_function": false,
		    "brace_style": "collapse",
		    "keep_array_indentation": false,
		    "keep_function_indentation": false,
		    "space_before_conditional": true,
		    "break_chained_methods": false,
		    "eval_code": false,
		    "unescape_strings": false,
		    "wrap_line_length": 0,
		    "wrap_attributes": "auto",
		    "wrap_attributes_indent_size": 4,
		    "end_with_newline": true
		};

		return gulp.src(sourceFile)

		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(angularify({
            customPrefixes: ['ui-'],
            verbose:true
        }))
		.pipe(htmlbeautify(options))
		.pipe(rename({
			suffix: '.compiled'
		}))
	    
        .pipe( gulp.dest(function (file) {
	        return file.base;
	    }))
        .pipe( browserSync.reload({stream:true}) );
	});



	gulp.task('clean:views',function(cb){

		return del([
			'./dist/views'
		], cb);
	});

	gulp.task('views',['clean:views'],function(){
		var sourceFile = 
		[
		'./app/**/*.view.html',
		'./app/**/*.view.php'
		];

		return gulp.src(sourceFile)
        .pipe( flatten() )
        .pipe( gulp.dest('./dist/views/'));
	});

	gulp.task('views:watch',function(){
		var sourceFile = 
		[
		'./app/**/*.view.html',
		'./app/**/*.view.php'
		];

		return gulp.src(sourceFile)
        .pipe( flatten() )
        .pipe( gulp.dest('./dist/views/'))
        .pipe( browserSync.reload({stream:true}) );
	});




	/**********
	********		=fonts
	**********/

	gulp.task('clean:fonts',function(cb){

		return del([
			'./dist/fonts'
		], cb);

	});
	gulp.task('fonts',['clean:fonts'],function(){
		var sourceFile = ['./source/fonts/**/*'];

		return gulp.src(sourceFile)
        .pipe( gulp.dest('./dist/fonts/'));
	
	});



	/**********
	********		=sass and =css
	**********/


	
	
	/* task for getting compiled css files in the source folder*/
		/* NOTE: task just for getting separate compiled css files in source folder*/
	gulp.task('sass', function(){ 
		        return gulp.src(['source/sass/**/*.scss'])
		        .pipe(plumber({
					errorHandler: onError
				}))
				.pipe(sourcemaps.init())
		        .pipe(sass())
		        .on('error', swallowError)
		        .pipe(sourcemaps.write())
		        .pipe(gulp.dest('source/css/'));

	});


	/* task for css libs */
	gulp.task('cssLibs', function(){ 
				return gulp.src(['source/css/libs/materialize.css',
								'source/css/libs/normalize.css',
								'source/css/libs/**/*.css'])
				.pipe(plumber({
					errorHandler: onError
				}))
				.pipe(sourcemaps.init())
				.pipe(concat('lib.css'))
				.pipe(sourcemaps.write())
				.pipe(gulp.dest('dist/css/'));

	});

	/* task for sass/css files*/
	gulp.task('css',['cssLibs','sass','fonts'], function(){ 
				var postcssPlugins = [
			        cssnext({browsers: ['last 3 version']})
			    ];				

		        return gulp.src(['source/css/main.css'])
		        .pipe(plumber({
					errorHandler: onError
				}))

				.pipe(sourcemaps.init())
		        .pipe(postcss(postcssPlugins))
		        .pipe(sourcemaps.init())
		        // .pipe(csslint())
    			// .pipe(csslint.formatter())
		        .pipe(gulp.dest('dist/css/'))
		        .pipe(browserSync.stream());	
	});

	gulp.task('css:watch', function(){ 
				var postcssPlugins = [
			        cssnext({browsers: ['last 3 version']})
			    ];				

		        return gulp.src(['source/css/main.css'])
		        .pipe(plumber({
					errorHandler: onError
				}))

				.pipe(sourcemaps.init())
		        .pipe(postcss(postcssPlugins))
		        .pipe(sourcemaps.init())
		        // .pipe(csslint())
    			// .pipe(csslint.formatter())
		        .pipe(gulp.dest('dist/css/'))
		        .pipe(browserSync.stream());
	});



	/* task for css libs for distribution build */
	gulp.task('cssLibs:dist', function(){ 
			return gulp.src(['source/css/libs/materialize.css',
							 'source/css/libs/normalize.css',
							 'source/css/libs/**/*.css'])
				.pipe(plumber({
					errorHandler: onError
				}))
		        .pipe(concat('lib.css'))
		        .pipe(cleanCss())
		        .pipe(gulp.dest('dist/css/'));
		});


	/* task for sass/css files for distribution build */
	gulp.task('css:dist',['cssLibs:dist','sass'], function(){ 
				var postcssPlugins = [
			        cssnext({browsers: ['last 3 version']})
			    ];
		        
		        return gulp.src(['source/css/main.css'])
		        .pipe(plumber({
					errorHandler: onError
				}))
		        .pipe(postcss(postcssPlugins))
		        .pipe(cleanCss())
		        .pipe(gulp.dest('dist/css/'));
		});



	/**********
	********		=php
	**********/

	gulp.task('clean:php',function(cb){

		return del([
			'./controller'
		], cb);
	});

	gulp.task('php',['clean:php'],function(){
		var sourceFile = ['!./app/**/*.view.php',
						  './app/components/**/*.php'];

		return gulp.src(sourceFile)
  		.pipe( gulp.dest('./controller/'));
	});

	gulp.task('php:watch',function(){
		var sourceFile = ['!./app/**/*.view.php',
						  './app/components/**/*.php'];

		return gulp.src(sourceFile)
        .pipe( gulp.dest('./controller/'))
        .pipe(browserSync.stream());
	});



/******
				=serve task

				=watch task
******/

	gulp.task('watchNserve', function(){
		browserSync.init({
	        // server: "./"
	        proxy: "localhost/stocknewsproj"
	    });

		gulp.watch(['./app/**/*.view.html', './app/**/*.view.php'],['views:watch'/*,'html'*/]);
		gulp.watch(['./app/**/*.js','./source/js/**/*.js'],['js:watch']);
		gulp.watch(['./source/sass/**/*.scss'], ['sass']);
		gulp.watch(['./source/css/libs/**/*.scss'], ['cssLibs']);
		gulp.watch(['./source/css/*.css'], ['css:watch']);
		gulp.watch(['!./app/**/*.view.php','./app/components/**/*.php'],['php:watch']);

		// gulp.watch(['./app/**/*.js','./source/js/**/*.js'],['js:watch']);
	    // gulp.watch("*.html").on('change', browserSync.reload);
	});

	gulp.task('watch', function(){

		gulp.watch(['./app/**/*.view.html', './app/**/*.view.php'],['views:watch'/*,'html'*/]);
		gulp.watch(['./app/**/*.js','./source/js/**/*.js'],['js:watch']);
		gulp.watch(['./source/sass/**/*.scss'], ['sass']);
		gulp.watch(['./source/css/libs/**/*.scss'], ['cssLibs']);
		gulp.watch(['./source/css/*.css'], ['css:watch']);
		gulp.watch(['!./app/**/*.view.php','./app/components/**/*.php'],['php:watch']);

		// gulp.watch(['./app/**/*.js','./source/js/**/*.js'],['js:watch']);
	    // gulp.watch("*.html").on('change', browserSync.reload);
	});






/******
					TASK CHAINS
******/

	
				//	DEV BUILDS
	

	/* =default task : run for development builds*/
	gulp.task('default', ['views','js','css','php'],function(cb){
		cb();
	});

	/* =run task : run for development build and serving to the server*/
	gulp.task('run', ['default'],function(){
		gulp.start('watchNserve');
	});

	/* =compile task : run for development build and watching the files (use your own server) */
	gulp.task('compile', ['default'],function(){
		gulp.start('watch');
	});



				//	DIST BUILDS

	/* build task : run for distribution build only*/
	gulp.task('build', ['views','html','js:dist','css:dist','php'],function(cb){
		cb();
	});

	/* run:dist task : run for distribution build and serving to the browser*/
	gulp.task('run:dist', ['build'],function(){
		gulp.start('watchNserve');
	});

	/* compile:dist task : run for distribution build and watching the files (use your own server) */
	gulp.task('compile:dist', ['build'],function(){
		gulp.start('watch');
	});




}());