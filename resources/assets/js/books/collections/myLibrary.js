var Backbone = require('backbone'),
    ls = require("backbone.localstorage"),
    BookModel = require('../models/BookModel');

const myLibrary = Backbone.Collection.extend({
    model: BookModel,
    localStorage: new Backbone.LocalStorage("myBooks")
});

module.exports = myLibrary;