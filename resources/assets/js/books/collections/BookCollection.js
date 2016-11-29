var Backbone = require('backbone'),
    BookModel = require('../models/BookModel');

const BookCollection = Backbone.Collection.extend({
    model: BookModel,
    parse: function(response) {
        return response.items;
    }
});

module.exports =  BookCollection;