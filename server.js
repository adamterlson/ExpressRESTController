var express = require('express'),
	Controller = require('./controller'),
	Backbone = require('backbone'),
	app = express();
 
var app = express();

app.configure(function () {
    app.use(express.bodyParser());
});

app.use('/', express.static('public'));

var data = new Backbone.Collection([]);
var controller = new Controller(data).bind(app, 'data');

// 99% case: basic functionality of returning data and standard error scenarios by convention

var data = new Backbone.Collection([
	{
		id: 1,
		description: 'First example task.',
		complete: true
	},
	{
		id: 2,
		description: 'Second example task.',
		complete: false
	}
]);
var controller = new Controller(data).bind(app, '/api/task');
// 1% case: customization of endpoint

var controller404 = new Controller(data, {
	post: function (req, res) {
		throw { code: 404, body: { error: true }};
	}
}).bind(app, '/api/will404');
 
app.listen(8000);
console.log('Listening on port 8000...');