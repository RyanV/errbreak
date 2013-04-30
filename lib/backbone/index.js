var _ = require("underscore")._
  , Backbone = require("backbone")
//  , pg = require("../database")
//  , pgClient = require("../database").client
  , noop = function(){}
  , Sync
  ;

var pg = require('pg').native
  , env = require("../env")
  , grunt = require("grunt")
  , config = process.env.DATABASE_URL || grunt.file.readYAML("config/database.yml")[env.name()]
  ;

function query(queryString, values, callback) {
  var client = new pg.Client(config),
    callbackCalled=false;
  client.connect();
  var query = client.query(queryString, values);

  query.on("error", function(err) {
    console.info("error");
    if (!callbackCalled) {
      callbackCalled = true;
      callback(err);
    }
  });

  query.on("row", function(row) {
    if (!callbackCalled) {
      if (row) {
        callbackCalled = true;
        callback(null, row);
      }
    }
  });

  query.on("end", function(err, result) {
    if (!callbackCalled) {
      callbackCalled = true;
      if (err) {
        callback(err)
      } else {
        callback(null, result);
      }
    }
    client.end();
  })
}

Backbone.async = function(method, model, callback) {
  callback = callback || noop;
  ModelSync[method](model, callback);
};

_.extend(Backbone.Model.prototype, {
  async: Backbone.async,
  save: function(options, callback) {
    var method, attrs = this.attributes;

    if (typeof options === "function") {
      callback = options;
      options = {};
    }

    options = _.extend({validate: true}, options);

    if (!this._validate(attrs, options)) callback(null, false);
    method = this.isNew() ? "create" : "update";
    this.async(method, this, callback);
  },
  destroy: function(callback) {
    this.async('delete', this, callback);
  }
});

ModelSync = {
  create: function(model, callback) {
    var client = new pg.Client(config),
      callbackCalled=false;
    client.connect();

    var tableName = model.tableName;
    var queryString = [
      "INSERT INTO " + tableName,
      "(message)",
      "values($1)",
      "RETURNING id, message"
    ].join(" ");
    var query = client.query(queryString, [model.get("message")]);

    query.on("row", function(row) {
      model.set(row);
      callback(null, row)
    });
  },
  read: function(model, callback) {

  },
  update: function(model, callback) {
    var client = new pg.Client(config),
      callbackCalled=false;
    client.connect();

    var tableName = model.tableName;
    var queryString = "UPDATE " + tableName + " SET (message) = ($1) WHERE id = $2 RETURNING id, message";
    var query = client.query(queryString, [model.get("message"), model.get("id")]);
    query.on("row", function(row) {
      model.set(row);
      callback(null, model);
    });
  },
  delete: function(model, callback) {
    var tableName = model.tableName;
    query("DELETE FROM " + tableName + " WHERE id = $1", [model.get("id")], function(err, result) {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    });
  }
};

module.exports = Backbone;
