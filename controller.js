var Backbone = require('backbone'),
	extend = require('extend'),
	__ = require('underscore');

// Controller
function Controller (database, overrides) {
	var self = this;

	// Controller Wrapper can be made smarter so that req isn't sent, but instead params when appropriate
	// or the req.body on POST or both on PUT
	function controllerWrapper (fn) {
		return function (req, res) {
			try {
				res.send(fn(req));
			}
			catch (ex) {
				// set response code to ex.type
				// set response body to ex.body
				// res.send.... something?
			}
		};
	}

	database || (database = new Backbone.Collection());
	
	extend(self, {
		list: function (req) { 
			console.log('list');
			return database.toJSON();
		},
		
		get: function (req) {
			console.log('get');
			return database.get(req.params.id).toJSON();
		},
		
		post: function (req) {
			console.log('post');
			var model = new Backbone.Model(req.body);
			model.set(model.idAttribute, __.uniqueId());
			database.add(model);
			return model.toJSON();
		},
		
		put: function (req) {
			console.log('put');
			return database.get(req.params.id).set(req.body).toJSON();
		},
		
		delete: function (req) {
			console.log('delete')
			database.remove(database.get(req.params.id));
			return;
		},

		restify: function (app, endpoint) {            
			app.get(endpoint, controllerWrapper(self.list));
			app.get(endpoint + '/:id', controllerWrapper(self.get));
			app.post(endpoint, controllerWrapper(self.post));
			app.put(endpoint + '/:id', controllerWrapper(self.put));
			app.delete(endpoint + '/:id', controllerWrapper(self.delete));

			return self;
		}
	}, overrides);

	return self;
}

module.exports = Controller;