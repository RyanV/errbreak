var _ = __ = require('underscore')._,
  pg = require("pg"),
  env = require("../env"),
  grunt = require("grunt"),
  config = grunt.file.readYAML("config/database.yml")[env.name()],
  client = new pg.Client(config);
client.connect();

var PostgresToJsDataTypeMap = {
  "text": {
    name: "string",
    comparator: function(val) {
      return _.isString(val);
    }
  },
  "integer": {
    name: "number",
    comparator: function(val) {
      return _.isNumber(val);
    }
  }
};

var Validator = module.exports = function(tableName) {
  var self = this;
  if ("undefined" === typeof tableName) {
    throw "Validator must be initialized with a table name";
  }
  this._tableName = tableName;
  this._schema = {};
  this.getSchema();
};

_.extend(Validator.prototype, {
  getSchema: function(reload, cb) {
    cb = cb || function(e) {
      if (e) throw e;
    };

    if (_.size(this._schema) && !reload) {
      cb(null, this._schema);
    } else {
      this._getSchema(_.bind(function(err, schema) {
        if (err) {
          cb(err);
        } else {
          this._schema = schema;
          cb(null, this._schema);
        }
      }, this));
    }
  },
  _getSchema: function(cb) {
    client.query("SELECT column_name,data_type from INFORMATION_SCHEMA.COLUMNS where table_name = '" + this._tableName + "'", function(err, result) {
      if (err) {
        cb(err)
      } else {
        var schema = _.inject(result.rows, function(_memo, row, idx) {
          _memo[row.column_name] = _.pick(row, "data_type");
          return _memo;
        }, {});
        cb(null, schema)
      }
    });
  },
  _columnData: function(column) {
    return this._schema[column];
  },
  _columnDataType: function(column) {
    return this._columnData(column).data_type;
  },
  validate: function(column, value) {
    var errors = [];
    errors.push(this._validateDataType(column, value));
    return _.compact(errors);
  },
  _validateDataType: function(column, value) {
    var dataType = this._columnDataType(column);
    var jsEquiv = PostgresToJsDataTypeMap[dataType];
    if (!jsEquiv.comparator(value)) {
      return "Invalid data type '" + typeof value + "' for column: " + column;
    }
  }
});
