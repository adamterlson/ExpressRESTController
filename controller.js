var Backbone = require('backbone'),
    extend = require('extend');

// Controller
function Controller (databaseCollection, overrides) {
    var self = this;

    // Controller Wrapper can be made smarter so that req isn't sent, but instead params when appropriate
    // or the req.body on POST or both on PUT
    function controllerWrapper (fn) {
        return function (req, res) {
            try {
                console.log(fn());
                //res.send(fn(req));
            }
            catch (ex) {
                // set response code to ex.type
                // set response body to ex.body
                // res.send.... something?
            }
        };
    }

    self.database = databaseCollection || new Backbone.Collection();
    
    extend(self, {
        list: function (req) { 
            return this.database.toJSON();
        },
        
        get: function (req) {
            return this.database.get(req.params.id).toJSON();
        },
        
        post: function (req) {
            return this.database.set(JSON.parse(req.body)).toJSON();
        },
        
        put: function (req) {
            return this.database.set(JSON.parse(req.body)).toJSON();
        },
        
        del: function (req) {
            return this.database.remove(database.get(req.params.id));
        },

        restify: function (app, endpoint) {            
            app.get(endpoint, controllerWrapper(self.list));
            app.get(endpoint + '/:id', controllerWrapper(self.get));
            app.post(endpoint, controllerWrapper(self.post));
            app.put(endpoint + '/:id', controllerWrapper(self.put));
            app.delete(endpoint + '/:id', controllerWrapper(self.del));

            return self;
        }
    }, overrides);

    return self;
}

module.exports = Controller;