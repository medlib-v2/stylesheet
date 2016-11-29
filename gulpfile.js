require('events').EventEmitter.defaultMaxListeners = 30;

var elixir = require('laravel-elixir'),
    cssnext = require('postcss-cssnext'),
    gutils = require('gulp-util');

require('laravel-elixir-browserify-official');
require('laravel-elixir-browsersync-official');
require('laravel-elixir-browserify-hmr');
require('laravel-elixir-uglify');
require('laravel-elixir-clean-unofficial');

elixir.config.js.browserify.transformers.push({
  name: 'vueify',

  options: {
    postcss: [cssnext({
        autoprefixer: {
          browsers: ['last 2 versions', 'ie >= 8', 'safari 5', 'opera 12.1', 'ios 6', 'android 4']
        }
      })]
  }
});

/**
 * elixir.config.js.browserify.watchify.enabled = true;
 * if(elixir.isWatching()){
 *  elixir.config.js.browserify.plugins.push({
 *      name: "browserify-hmr",
 *      options : {}
 *   });
 * }
 *
 * require('laravel-elixir-vueify');
 * elixir.config.js.browserify.plugins.push({
 *   name: 'vueify-extract-css',
 *   options: {
 *       out: 'path/to/extracted/bundle.css'
 *   }
 * });
 **/

/**
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */
elixir(function(mix) {
    mix .clean()
        .less('application.less', 'public/css/application.css')
        .browserify('app.js', 'public/js/app.min.js')
        .copy('resources/assets/js/jquery/jquery.min.js', 'public/js/jquery.min.js')
        .styles([
            'material-design-icons/css/material-design-iconic-font.min.css',
            'perfect-scrollbar/css/perfect-scrollbar.min.css'],
            'public/css/vendors.min.css', 'resources/assets/less/plugins'
        ).scripts([
            'less/plugins/perfect-scrollbar/js/perfect-scrollbar.jquery.min.js',
            'js/plugins/jquery.touchSwipe.min.js'
            ],
            'public/js/plugins-vendor.min.js', './resources/assets'
        )
        .scripts([
                'js/arrow.js',
                'js/password.js',
                'js/inputField.js'],
            'public/js/medlib.plugins.min.js', './resources/assets'
        )
        .uglify(['**/*.js', '!**/*.min.js', '!**/*.map'], 'public/js', {
            mangle: true,
            suffix: '.min.js'
        })
        .version([
            'css/application.css',
            'css/vendors.min.css',
            'js/jquery.min.js',
            'js/app.min.js'])
        .copy('resources/assets/images', 'public/images')
        .copy('resources/assets/fonts', 'public/build/fonts')
        .clean([
            'public/css',
            'public/js'
        ]);

    if (process.env.NODE_ENV !== 'production') {

        mix.artisanServe({
            php_path: '/usr/local/bin/php',
            artisan_path: './artisan',
            host: '127.0.0.1',
            port: 8000,
            show_requests: true
        }).browserSync({
            proxy: '127.0.0.1:8000',
            files: [
                elixir.config.appPath + '/**/*.php',
                elixir.config.get('public.css.outputFolder') + '/**\/*.css',
                elixir.config.get('public.versioning.buildFolder') + '/rev-manifest.json',
                'resources/views/**/*.php'
            ],
            browser: ['google chrome']
        });
    }
});
