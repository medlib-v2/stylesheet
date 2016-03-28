'use strict';

var gulp = require('gulp'),
	watch = require('gulp-watch'),
	prefix	= require('gulp-autoprefixer'),
	path = require('path'),
	minifyHtml = require('gulp-minify-html'),
	less = require('gulp-less'),
	minifyCss = require('gulp-minify-css'),

	LessPluginAutoPrefix = require('less-plugin-autoprefix'),
	autoprefix = new LessPluginAutoPrefix({browsers: ["last 2 versions"]}),
	mergeJs = require('gulp-merge'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),

	settings = {
		appFolder: '../app/',
		buildFolder : '../build/',
		assetsFolder : '../assets/',
		assetsPlugins: '../bower/bower_components/'
	};

// Minify HTML
gulp.task('minify-html', function () {
	gulp.src(settings.appFolder+'medlib/*.html')
		.pipe(minifyHtml())
		.pipe(gulp.dest(settings.appFolder+'medlib/min/'));
});

// Compile Less
gulp.task('compile-less', function () {
	gulp.src(settings.buildFolder+'medlib/less/application.less')
		.pipe(less({
			plugins: [autoprefix]
		}))
		.pipe(gulp.dest(settings.assetsFolder+'medlib/css/'));

	gulp.src(settings.buildFolder+'elements/less/elements.less')
		.pipe(less({
			plugins: [autoprefix]
		}))
		.pipe(gulp.dest(settings.assetsFolder+'medlib/css/'));

	gulp.src(settings.buildFolder+'medlib/less/plugins.less')
		.pipe(less({
			plugins: [autoprefix]
		}))
		.pipe(gulp.dest(settings.assetsFolder+'medlib/css/'));
});

// Minify Css
gulp.task('minify-css', function () {
	gulp.src(settings.assetsFolder+'medlib/css/*.css')
		.pipe(minifyCss())
		.pipe(gulp.dest(settings.assetsFolder+'medlib/css/min/'));
});

gulp.task('global-plugins', function () {
	gulp.src([
		settings.assetsPlugins+'jquery/dist/jquery.min.js',
		settings.assetsPlugins+'jquery-ui/jquery-ui.min.js',
		settings.assetsPlugins+'bootstrap/dist/js/bootstrap.min.js',
		settings.assetsPlugins+'velocity/velocity.min.js',
		settings.assetsPlugins+'moment/min/moment.min.js',
		settings.assetsPlugins+'toastr/toastr.min.js',
		settings.assetsPlugins+'scrollMonitor/scrollMonitor.js',
		settings.assetsPlugins+'textarea-autosize/dist/jquery.textarea_autosize.min.js',
		settings.assetsPlugins+'bootstrap-select/dist/js/bootstrap-select.min.js',
		settings.assetsPlugins+'fastclick/lib/fastclick.js'
	])
	.pipe(concat('global-plugins.js'))
	.pipe(gulp.dest(settings.assetsFolder+'medlib/js/'));
});

// Minify JavaScript
gulp.task('minify-js', function () {
	gulp.src(settings.assetsFolder+'medlib/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest(settings.assetsFolder+'medlib/js/min/'));

	gulp.src(settings.assetsFolder+'medlib/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest(settings.assetsFolder+'medlib/js/min/'));
});

/**
gulp.task('watch', function(){
	gulp.watch('default', [
		'global-plugins',
		'compile-less',
		'minify-css',
		'minify-html',
		'minify-js'
	]);
});
*/
gulp.task('default',
	[
		'global-plugins',
		'compile-less',
		'minify-css',
		'minify-html',
		'minify-js'
	]
);


