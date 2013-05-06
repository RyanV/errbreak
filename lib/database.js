var _ = require('underscore')._
  , slice = Array.prototype.slice
  , grunt = require("grunt")
  , env = require("./env")
  , config = process.env.DATABASE_URL || grunt.file.readYAML("config/database.yml")[env.name()]
  , pg = require('pg')
  , client = new pg.Client(config)
  ;

client.connect();

function PgQuery(tableName) {
  this._tableName = tableName;
  this._values = [];
  this._escapeValues = [];
}

_.extend(PgQuery.prototype, {
  execute: function(callback) {
    this._query(this.buildQueryString(), this._escapeValues, callback);
  },
  buildQueryString: function() {
    var queryStr = "INSERT INTO " + this._tableName;

    var columns = _.inject(this._values, function(memo, value, index) {
      memo.push(value[0]);
      return memo;
    }, []).join(" ");
    var values = _.inject(this._values, function(memo, value, index) {
      memo.push("'" + value[1] +"'");
      return memo;
    }, []).join(" ");
    queryStr += "(" + columns + ") ";
    queryStr += "VALUES(" + values + ")";
    return queryStr;
  },
  _query: function(query, escapeValues, callback) {
    client.query(query, escapeValues, callback);
  },
  value: function(column, value, escape) {
    this._values.push(slice.call(arguments));
  }
});

module.exports.insertInto = function(tableName) {
  return new PgQuery(tableName);
};

//module.exports.client = function() {
//  var client = new pg.Client(config);
//  client.connect();
//  return client;
//};
//
//module.exports.query = function(a, b, c) {
//  var client = new pg.Client(config);
//  client.connect();
//  var query = client.query(a, b, c);
////  query.on('end', function() {
////    client.end();
////  });
//  return query;
//};
