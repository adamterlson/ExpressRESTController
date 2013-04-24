var express = require('express'),
	Controller = require('./controller'),
	Backbone = require('backbone'),
	app = express();
 
var app = express();

app.configure(function () {
    app.use(express.bodyParser());
});

app.use('/', express.static('public'));

// 99% convention case use: basic functionality of returning data and standard error scenarios

var data = new Backbone.Collection([]);
var controller = new Controller(data).restify(app, 'data');

// 1% case: customization of endpoint
/*
var myData = new Backbone.Collection([]);
var My404TestController = new Controller(myData, {
    get: function (req) {
        throw { type: 404, body: {} };
    }
});
RestBinder('api/stuff', My404TestController);
*/
 
app.listen(8000);
console.log('Listening on port 8000...');