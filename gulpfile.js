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
    mix //.clean()
        .less('application.less', 'public/css/application.css')
        .browserify('app.js', 'public/js/app.min.js')
        .copy('resources/assets/js/jquery/jquery.min.js', 'public/js/jquery.min.js');
    
    mix.styles([
        'material-design-icons/css/material-design-iconic-font.min.css',
        'perfect-scrollbar/css/perfect-scrollbar.min.css'
        ], 'public/css/vendors.min.css', 'resources/assets/less/plugins'
    ).scripts([
            'less/plugins/perfect-scrollbar/js/perfect-scrollbar.jquery.min.js',
            'js/plugins/jquery.touchSwipe.min.js'
        ],'public/js/plugins-vendor.min.js', './resources/assets');
    
    mix.uglify(['**/*.js', '!**/*.min.js', '!**/*.map'], 'public/js', {
        mangle: true,
        suffix: '.min.js'
    });
    
    mix.version([
        'css/application.css',
        'css/vendors.min.css',
        'js/app.min.js']);
    
    mix.copy('resources/assets/images', 'public/images')
        .copy('resources/assets/fonts', 'public/build/fonts');

    if (process.env.NODE_ENV !== 'production') {

        mix.browserSync({
            //proxy: '127.0.0.1:8000',
            files: [
                elixir.config.appPath + '/**/*.php',
                elixir.config.get('public.css.outputFolder') + '/**\/*.css',
                elixir.config.get('public.versioning.buildFolder') + '/rev-manifest.json',
                'resources/views/**/*.php'
            ],
            browser: ['chrome']
        });
    }
});
