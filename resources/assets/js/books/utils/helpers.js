var _ = require('lodash'),
    $ = require('jquery'),
    v = require('./variables'),
    Backbone = require('backbone');

//Check for long synopsis and make it shorter
var shortSynopsis = function() {
    var moreText = "Voir plus »",
        hideDesc = '<div class="hide-description overflow"><a href="#" class="more">Voir plus »</a></div>',
        $desc = $('.description'),
        height = $('.more-block').height();

    if (height > 200) {
        $desc.append(hideDesc);
        $('.more-block').addClass('shorten');

        $('.more').on('click', function(e) {
            e.preventDefault();
            var buttonTxt = $('.more').text() == "Voir plus »" ? "« Voir moins" : "Voir plus »";

            $desc.find(".more-block").toggleClass('long');
            $(".hide-description").toggleClass('overflow');
            $('.more').text(buttonTxt).toggleClass('less');
        });
    }
};

/*
 topicsForm = function () {
 var $topics = $('.topics input');

 $topics.change(function() {
 if($(this).is(":checked")) {
 console.log(this);
 }
 });
 _.each($topics, function(topic) {
 console.log(topic);
 });
 }; */


module.exports = {
    shortSynopsis: shortSynopsis
};