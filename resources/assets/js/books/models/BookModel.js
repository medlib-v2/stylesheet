var Backbone = require('backbone');

const BookModel = Backbone.Model.extend({
    defaults: {
        "volumeInfo": [{
            "description": "",
            "title": "",
            "imageLinks": [{
                "smallThumbnail": "http://placehold.it/128x195/ffffff/999999",
                "thumbnail": "http://placehold.it/128x195/ffffff/999999"
            }]
        }]
    }
});

module.exports =  BookModel;