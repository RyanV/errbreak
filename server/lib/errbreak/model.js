var _ = require("underscore")._
  , slice = Array.prototype.slice
  ;

var Model = module.exports = function(attributes, options) {
  var attrs = attributes || {};
  this.attributes = {};
  this.set(attrs);
  this.initialize.apply(this, arguments);
};

_.extend(Model.prototype, {
  initialize: function() {
    // no-op that can be overridden in subclassed in subclassed
    // prototype methods;
  },
  set: function(key, val, options) {
    var attr, attrs, unset, current;
    if (_.isObject(key)) {
      attrs = key;
      options = val;
    } else {
      (attrs = {})[key] = val;
    }

    options || (options = {});

    unset = options.unset;

    current = this.attributes;

    for (attr in attrs) {
      val = attrs[attr];
      unset ? delete current[attr] : current[attr] = val;
    }
    return this;
  },
  get: function(key) {
    return this.attributes[key];
  },
  unset: function(key, options) {
    this.set(key, void 0, _.extend({}, options, {unset: true}));
  },
  clear: function(options) {
    var attrs = {}, key;
    for (key in this.attributes) {
      attrs[key] = void 0;
    }
    this.set(attrs, _.extend({}, options, {unset: true}));
  },
  isValid: function() {
    return true;
  }
});

/**
 * Underscore methods that we want to implement on the Model.
 */
var modelMethods = ['keys', 'values', 'pairs', 'invert', 'pick', 'omit'];

/**
 * Mix in each Underscore method as a proxy to `Model#attributes`.
 */
_.each(modelMethods, function(method) {
  Model.prototype[method] = function() {
    var args = slice.call(arguments);
    args.unshift(this.attributes);
    return _[method].apply(_, args);
  };
});
