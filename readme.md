#Express REST Controller
========================
This controller serves as a nice foundation for rapidly (and I do mean rapidly) creating REST APIs on a Backbone object stored in memory.

By using this, you will get full CRUDL (Create, Read, Update, Delete and List) support on your Backbone Collection at an endpoint of your chosing.

Persisting that Backbone Collection to a data store or doing other interesting things with it is up to you.

## Why would I use this...?

Whether it's for rapid prototyping where you don't want to be bothered with real persistent storage or because your data store doesn't nicely fit your REST and you want to have a middle-layer shim, putting a backbone collection on the server can be exceptionally powerful.

Express REST Controller removes the need for the boilerplate REST code and allows you to just operate on a Backbone Collection as you normally would and let the REST endpoints feed into it directly.

## Controller Construction

`new Controller(database, overrides)`

* `database`: a `Backbone.Collection`
* `overrides` (optional): overrides for endpoints

## Bind
Called on a controller, bind will go and hook all the controller endpoints defined to their appropriate HTTP verbs according to the chart below.

Any overrides will be bound via this method as well so must be set prior to its call.

```
myController.bind(app, endpoint)
```
* `app` - Your express app.
* `endpoint` - A string representing the base endpoint that your collection will be exposed at (e.g. 'customer')

### Controller Actions

HTTP METHOD | URL | Controller Action | Description
--- | --- | --- | ---
GET | /api | list | returns all objects in the collection
GET | /api/:id | get | gets a specific object
POST | /api | create | adds a new object to the collection (object is in `req.body`)
PUT | /api/:id | update | updates an existing object in the collection (object is in `req.body`)
DELETE | /api/:id | remove | removes an object from the collection

## Basic Usage
```
var app = express();
var controller = new Controller();
controller.bind(app, endpoint);
```

## Advanced Usage
### Bootstrapping Data
By passing in your database instead of having the controller create one, you can bootstrap your collection with data as necessary.
```
var app = express();
var database = new Backbone.Collection([
  // Your bootstrap data
]);
var controller = new Controller(database);
controller.bind(app, endpoint);
```

### Overriding Endpoints
Pass into the constructor of your controller your endpoint overrides:
```
var controller = new Controller(null, {
  create: function (res) {
    // new create logic
  },
  delete: function (res) {
    // new delete logic
  }
});
```

### Creating endpoints
Each controller method is called with `req` and `res` though there are shortcuts to avoid their use, further abstracting away Express and behave a bit more like one might expect.

#### Accessing your database

Each endpoint's context contains the database passed into its constructor.  Access via `this.database`.

#### Successful returns

```
function endpoint (req) {
  return { status: 'happy' };
}
```

Optionally you can leverage Express' `res` object.

```
function endpoint (req, res) {
  res.send({ status: 'happy' });
}
```

#### Throwing errors
Each controller is wrapped in a generic try/catch which can be a convenience for throwing errors to the caller.

```
function endpoint (req) {
  throw { code: 404, body: { status: 'sad' }};
}
```

Optionally you can leverage Express' `res` object.

```
function endpoint (req, res) {
  res.send(404, { status: 'sad' });
}
```
