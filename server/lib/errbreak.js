var _ = require("underscore")._
  , path = require('path')
  , slice = Array.prototype.slice
  , Config = require(path.join(__dirname, "../../config"))
  , FastLegSBase = require('FastLegS')
  , FastLegS = new FastLegSBase('pg')
  ;

var ErrBreak = {};

_.extend(ErrBreak, {
  _connected: false,
  connect: function(connectionParams) {
    if (!ErrBreak._connected) {
      // default to connection string.  FastLegS seems to have trouble
      // building connection from an object
      ErrBreak._connect(connectionParams || Config.Database.connectionString());
    }
    return ErrBreak;
  },
  _connect: function(connectionParams) {
    FastLegS.connect(connectionParams);
    ErrBreak._connected = true;
  },
  disconnect: function() {
    if (ErrBreak._connected) {
      FastLegS.client && FastLegS.client.disconnect();
      ErrBreak._connected = false;
    }
  },
  _disconnect: function() {
    FastLegS.client && FastLegS.client.disconnect();
    ErrBreak._connected = false;
  },
  connectionProxy: function() {
    return FastLegS;
  }
});

ErrBreak.Model      = require("./errbreak/model");
ErrBreak.Collection = require("./errbreak/collection");
ErrBreak.Validator  = require("./errbreak/validator");

var extend = require("./errbreak/extend");
["Model", "Collection", "Validator"].forEach(function(a) {
  ErrBreak[a].extend = extend;
});

module.exports = ErrBreak;
