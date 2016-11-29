/**
 * 
 * @type type Medlib.InputField
 */
var Medlib = (function () {
    'use strict';
    Medlib.InputField = function( ){
        /**
         * On focus
         */
        $('.form-control').focus(function(){
            $(this).parent().addClass('is-focused is-active');
        });
        
        /**
         * on blur
         */
        $('.form-control').blur(function(){
            var $parent = $(this).parent();
         
            if($(this).val() == ''){
                $parent.removeClass('is-active');
            }
            $parent.removeClass('is-focused');
        });
        /**
         * Si un champs est rempli on rajoute directement la class is-active
         */
        $('.form-control').each(function(){
            if($(this).val() != ''){
                $(this).parent().addClass('is-active');
            }
        });
    };
    return Medlib;
})(Medlib || {});