var Backbone = require('backbone'),
    v = require('../utils/variables'),
    SearchView = require('../views/SearchView');

module.exports = Backbone.Router.extend({
    routes: {
        "": "index",
        "browse/:query": "browse", // #browse/php
        "browse/subject/:query/:index": "subject",
        "browse/publisher/:query/:index": "publisher",
        "browse/author/:query/:index": "author"
    },

    index() {
        var search = new SearchView();
    },
    browse(term) {
        var search = new SearchView();
        search.browse(term, index = '0', v.MAX_DEFAULT);
    },
    subject(term, index) {
        var search = new SearchView();
        search.browse('subject:' + term, index, v.MAX_DEFAULT);
    },
    publisher(term, index) {
        var search = new SearchView();
        search.browse('inpublisher:' + term, index, v.MAX_DEFAULT);
    },
    author(term, index) {
        var search = new SearchView();
        search.browse('inauthor:' + term, index, v.MAX_DEFAULT);
    }

});