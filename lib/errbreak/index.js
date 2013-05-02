var _ = require("underscore")._
  , slice = Array.prototype.slice
  ;

var ErrBreak = {};
ErrBreak.Model = require("./model");
ErrBreak.Collection = require("./collection");
ErrBreak.Validator = require("./validator");

var extend = require("./extend");
ErrBreak.Model.extend = ErrBreak.Collection.extend = ErrBreak.Validator.extend = extend;

module.exports = ErrBreak;

// select column_name,data_type from INFORMATION_SCHEMA.COLUMNS where table_name = 'notifications';
