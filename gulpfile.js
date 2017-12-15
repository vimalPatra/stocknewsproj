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

	var del = require('del');

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
 


/***************** 
************	individual tasks for development build
*****************/


	/* task for bundling JS libraries via ES6 modules*/

	gulp.task('bundleJS', function() {
			var bundleStream = browserify('./source/js/vendor/lib.js').bundle();
	
		    return bundleStream
		    	.pipe(plumber({
					errorHandler: onError
				}))
		        //Pass desired pretend filename to vinyl-source-stream
		        .pipe(source('bundle.js'))
		        //Rename it to desired output filename
			    .pipe(rename('lib.js'))
		        // Start piping stream to tasks!
		        .pipe(gulp.dest('./dist/js/'));
		});


	/* task for bundling JS files and write to single js file*/
	gulp.task('js',['bundleJS'],function(){ 
		        return gulp.src(['app/**/*.js','source/js/main.js'])
		        .pipe(plumber({
					errorHandler: onError
				}))			
		        .pipe(concat('app.js'))
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
	
	/* task for css libs */
	gulp.task('cssLibs', function(){ 
				return gulp.src(['source/css/libs/*.css'])
				.pipe(plumber({
					errorHandler: onError
				}))
				.pipe(concat('lib.css'))
				.pipe(gulp.dest('dist/css/'));

	});

	/* task for sass/css files*/
	gulp.task('css',['cssLibs'], function(){ 
				var postcssPlugins = [
			        cssnext({browsers: ['last 3 version']})
			    ];				

		        return gulp.src(['source/sass/main.scss'])
		        .pipe(plumber({
					errorHandler: onError
				}))
		        .pipe(sass())
		        .pipe(postcss(postcssPlugins))
		        .pipe(csslint())
    			.pipe(csslint.formatter())
		        .pipe(gulp.dest('dist/css/'))
		        .pipe(browserSync.stream());
	

	});




	/* task for getting compiled css files in the source folder*/
		/* NOTE: unnecessary task just for getting separate compiled css files */
	gulp.task('sass', function(){ 
				var postcssPlugins = [
			        cssnext({browsers: ['last 3 version']})
			    ];				

		        return gulp.src(['source/sass/*.scss'])
		        .pipe(plumber({
					errorHandler: onError
				}))
		        .pipe(sass())
		        .pipe(postcss(postcssPlugins))
		        .pipe(gulp.dest('source/css/'));

	});

	
	gulp.task('html',function(){
		var sourceFile = ['./app/**/!(*-2).html','./!(*-2).html'];

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
			suffix: '-2'
		}))
	    
        .pipe( gulp.dest(function (file) {
	        return file.base;
	    }))
        .pipe( browserSync.reload({stream:true}) )
        ;
	});





/******** 
****		individual tasks for distribution build
********/


	/* task for bundling JS libraries via ES6 modules for distribution build */ 
	gulp.task('bundleJS:dist', function() {
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



	/* task for bundling JS files and write to single js file for distribution build */ 
	gulp.task('js:dist',['bundleJS:dist'], function(){ 
		        return gulp.src(['app/**/*.js','source/js/main.js'])
		        .pipe(plumber({
					errorHandler: onError
				}))
		        .pipe(concat('app.js'))
		        .pipe(uglify())
		        .pipe(gulp.dest('dist/js/'));
	
		});


	/* task for css libs for distribution build */
	gulp.task('cssLibs:dist', function(){ 
			return gulp.src(['source/css/libs/*.css'])
				.pipe(plumber({
					errorHandler: onError
				}))
		        .pipe(concat('lib.css'))
		        .pipe(cleanCss())
		        .pipe(gulp.dest('dist/css/'));
		});


	/* task for sass/css files for distribution build */
	gulp.task('css:dist',['cssLibs:dist'], function(){ 
				var postcssPlugins = [
			        cssnext({browsers: ['last 3 version']})
			    ];
		        
		        return gulp.src(['source/css/main.scss'])
		        .pipe(plumber({
					errorHandler: onError
				}))
		        .pipe(sass())
		        .pipe(postcss(postcssPlugins))
		        .pipe(cleanCss())
		        .pipe(gulp.dest('dist/css/'));
		});



/******
				=serve task

				=watch task
******/

	gulp.task('watchNserve', function(){
		browserSync.init({
	        server: "./"
	    });
		gulp.watch(['./*.html','./**/*.html'],['html']);
		gulp.watch(['./source/sass/*.scss','./source/css/libs/*.css'], ['css','sass']);
		gulp.watch(['./app/**/*.js','./source/js/*.js'],['js']);
	    // gulp.watch("*.html").on('change', browserSync.reload);
	});






/******
					TASK CHAINS
******/

	

	/* =run task : run for development builds*/
	gulp.task('default', ['html','js','css'],function(cb){
		cb();
	});

	/* =default task : run for development build and serving to the server*/
	gulp.task('run', ['default','watchNserve']);



	

	/* build task : run for distribution build only*/
	gulp.task('build', ['html','js:dist','css:dist'],function(cb){
		cb();
	});

	/* build task : run for distribution build and serving to the browser*/
	gulp.task('run:dist', ['build','watchNserve']);




}());