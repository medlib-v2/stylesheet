(function($, window, document, undefined) {
    var dataKey = 'hideShowPassword', 
    defaults = {
        show: 'infer',
        innerToggle: false,
        hideToggleUnit: false,
        touchSupport: false,
        toggleEvent: 'click',
        toggleTouchEvent: 'touchstart mousedown',
        toggleClass: 'glyphicon',
        wrapperClass: 'hideShowPassword-toggle-icon',
        title: 'Click here show/hide password',
        minLength: 8,
        minAcceptableScore: 30,
        allowSpace: false,
        change: function() { },
        states: {

          // These settings are applied when the password text is
          // visible (show: true).
          shown: {

            // Class to apply to the input element.
            inputClass: 'password-shown',

            // Event to trigger on the input.
            eventName: 'passwordShown',

            // Class to apply to the toggle.
            toggleClass: 'glyphicon-eye-close',

            // Property values to apply to the input element.
            attr: {
              'type': 'text',
              'autocapitalize': 'off',
              'autocomplete': 'off',
              'autocorrect': 'off',
              'spellcheck': 'false'
            }
          },

          // Settings when text is hidden (show: false).
          hidden: {
            inputClass: 'password-hidden',
            eventName: 'passwordHidden',
            toggleClass: 'glyphicon-eye-open',
            attr: { 'type': 'password' }
          }
        },
        widthMethod: ($.fn.outerWidth === undefined) ? 'width' : 'outerWidth',
        heightMethod: ($.fn.outerHeight === undefined) ? 'height' : 'outerHeight'
    };

    /**
     * Constructor
     * @param element
     * @param options
     * @constructor
     */
    function Password(element, options) {
        this.element = $(element);
        this.init(options);
    }
    
    Password.prototype = {
        // Initialization logic (only runs first time)
        init: function (options) {
            this.update(options, defaults, (this.element.prop('type') === 'password'));
            if (this.options.innerToggle) {
                this.initInnerToggle(this.element, this.options);
            }
        },
        
        // Processes fresh options and updates the input state
        update: function (options, base, toggleFallback) {
          base = base || this.options;
          toggleFallback = toggleFallback || !this.options.show;
          // Allow show/hide shorthand
          if (typeof options !== 'object') {
            options = { show: options };
          }
          // Update the options
          this.options = $.extend({}, base, options);
          // Interpret strings
          if (this.options.show === 'toggle') {
            this.options.show = toggleFallback;
          }
          if (this.options.show === 'infer') {
            this.options.show = (this.element.prop('type') !== 'password');
          }
          // Apply and remove attributes based on the new state
          this.ifCurrentOrNot($.proxy(function (state) {
            // This is a loop because Zepto's prop method does not
            // support an object of key/value pairs.
            $.each(state.attr, $.proxy(function (key, value) {
              this.element.prop(key, value);
            }, this));
            this.element.addClass(state.inputClass).trigger(state.eventName);
          }, this), $.proxy(function (state) {
            this.element.removeClass(state.inputClass);
          }, this));
        },
        
        // Toggle shorthand
        toggle: function () {
          this.update('toggle');
        },
        
        // Return the current state key
        currentStateKey: function () {
          return this.options.show ? 'shown' : 'hidden';
        },
        
        // Loop through all states, perform one action for
        // the current state and another for others.
        ifCurrentOrNot: function (ifCurrent, ifNot) {
          var currentKey = this.currentStateKey();
          $.each(this.options.states, function (thisKey, state) {
            ((currentKey === thisKey) ? ifCurrent : ifNot)(state);
          });
        },
        
        // Build the inner toggle, wrapper, and associated events
        initInnerToggle: function (el, options) {

          var attachment = (el.css('direction') === 'rtl') ? 'left' : 'right', elWidth = el[options.widthMethod](), 
          elCSS = {
                marginTop: 0,
                marginRight: 0,
                marginBottom: 0,
                marginLeft: 0
              }
            , eventName = ''
            , elWidth
            , wrapper
            , icon
            , toggle;

          wrapper = el.parent().find('.hideShowPassword-toggle');
          /**
          if (wrapper[options.widthMethod]() !== elWidth) {
            wrapper.css('width', elWidth);
          } **/
          //span = wrapper.find('.hideShowPassword-toggle');
          toggle = $('<span />').addClass(options.wrapperClass);
          toggle.attr('tabindex', 100);
          toggle.attr('title', options.title);
          icon = $('<i />').addClass(options.toggleClass);
          this.updateInnerToggle(icon, this.currentStateKey(), options.states);
          icon.appendTo(toggle);

          toggle.appendTo(wrapper);
  
          elCSS['padding' + attachment.replace(/./, function(m) { return m[0].toUpperCase() })] = toggle[options.widthMethod]();
          el.css(elCSS);

          if (options.touchSupport) {
            toggle.css('pointerEvents', 'none');
            el.on(options.toggleTouchEvent, $.proxy(function (event) {
              var toggleX = toggle.offset().left
                , eventX
                , lesser
                , greater;
              if (toggleX) {
                eventX = event.pageX || event.originalEvent.pageX;
                if (attachment === 'left') {
                  toggleX+= toggle[options.widthMethod]();
                  lesser = eventX;
                  greater = toggleX;
                } else {
                  lesser = toggleX;
                  greater = eventX;
                }
                if (greater >= lesser) {
                  event.preventDefault();
                  this.toggle();
                }
              }
            }, this));
          } else {
            toggle.on(options.toggleEvent, $.proxy(function () {
              this.toggle();
            }, this));
          }
    
          $.each(options.states, function (key, state) {
            eventName += state.eventName + ' ';
          });
          el.on(eventName, $.proxy(function () {
            this.updateInnerToggle(icon, this.currentStateKey(), options.states);
          }, this));
    
    
          if (options.hideToggleUntil) {
            toggle.hide();
            el.one(options.hideToggleUntil, function () {
              toggle.show();
            });
          }
        },
        
        // Update the inner toggle (text, class, etc.)
        updateInnerToggle: function (el, currentKey, states) {
          this.ifCurrentOrNot(function (state) {
            el.addClass(state.toggleClass);
          }, function (state) {
            el.removeClass(state.toggleClass);

          });
        }
    };

    /**
     * The main function, reuses previous instance if it exists
     * @param options
     * @constructor
     */
    $.fn.Password = function (options) {
        return this.each(function () {
            var $this = $(this), data = $this.data(dataKey);
            if (data) {
                data.update(options);
            } else {
                $this.data(dataKey, new Password(this, options));
            }
        });
    };

    /**
     * Shorthand plugins
     */
    $.each({ 'show':true, 'hide':false, 'toggle':'toggle' }, function (verb, showVal) {
        $.fn[verb + 'Password'] = function (options) {
            return this.Password($.extend({}, options, { show: showVal }));
        };
    });
})(jQuery, window, document);

/**
 *
 * @type type Medlib.Password
 */

var Medlib = (function () {
    'use strict';
    Medlib.Password = function(element, options){
        $(element).Password(options);
    };
    return Medlib;
})(Medlib || {});