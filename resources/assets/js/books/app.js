let $ = require('jquery'),
    Backbone = require('backbone');
    Backbone.$ = $;
console.log(Backbone, 'Backbone');
let Router = require('./routers/routes'),
    //Instiantiate the router
    router = new Router();
// Start Backbone history for bookmarkable URL's
Backbone.history.start();