/**
 * 
 * @type type Medlib.Arrow
 */

var Medlib = (function () {
    'use strict';
    Medlib.Arrow = function( ){
        /**
         * The small arrow that marks the active search icon:
         * @type {*}
         */
        var arrow = $('<span>',{class:'arrow'}).appendTo('ul.icons');
        $('ul.icons li').click(function(){
            var el = $(this);
            if(el.hasClass('active')){
                /**
                 * The icon is already active, exit
                 */
                return false;
            }
            
            el.siblings().removeClass('active');
            el.addClass('active');
            /**
             * Move the arrow below this icon
             */
            arrow.stop().animate({
                left: el.position().left,
                marginLeft: (el.width()/2)-4
            });
        });
        
        /**
         * Marking the web search icon as active:
         */
        $('li.all').click();

        /**
         * Focusing the input text box:
         */
        $('#s').focus();
    };
    return Medlib;
})(Medlib || {});