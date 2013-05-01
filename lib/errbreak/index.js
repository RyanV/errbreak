var _ = require("underscore")._
  , slice = Array.prototype.slice
  ;

var ErrBreak = {};
/*
 var Model = Backbone.Model = function(attributes, options) {
 var defaults;
 var attrs = attributes || {};
 options || (options = {});
 this.cid = _.uniqueId('c');
 this.attributes = {};
 _.extend(this, _.pick(options, modelOptions));
 if (options.parse) attrs = this.parse(attrs, options) || {};
 if (defaults = _.result(this, 'defaults')) {
 attrs = _.defaults({}, attrs, defaults);
 }
 this.set(attrs, options);
 this.changed = {};
 this.initialize.apply(this, arguments);
 };
 */

var Model = ErrBreak.Model = function(attributes, options) {
  this.attributes = {};
  this.initialize.apply(this, arguments);
};

_.extend(Model.prototype, {
  initialize: function() {
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
  }
});

// Underscore methods that we want to implement on the Model.
var modelMethods = ['keys', 'values', 'pairs', 'invert', 'pick', 'omit'];

// Mix in each Underscore method as a proxy to `Model#attributes`.
_.each(modelMethods, function(method) {
  Model.prototype[method] = function() {
    var args = slice.call(arguments);
    args.unshift(this.attributes);
    return _[method].apply(_, args);
  };
});

var extend = function(protoProps, staticProps) {
  var parent = this;
  var child;

  // The constructor function for the new subclass is either defined by you
  // (the "constructor" property in your `extend` definition), or defaulted
  // by us to simply call the parent's constructor.
  if (protoProps && _.has(protoProps, 'constructor')) {
    child = protoProps.constructor;
  } else {
    child = function() {
      return parent.apply(this, arguments);
    };
  }

  // Add static properties to the constructor function, if supplied.
  _.extend(child, parent, staticProps);

  // Set the prototype chain to inherit from `parent`, without calling
  // `parent`'s constructor function.
  var Surrogate = function() {
    this.constructor = child;
  };
  Surrogate.prototype = parent.prototype;
  child.prototype = new Surrogate();

  // Add prototype properties (instance properties) to the subclass,
  // if supplied.
  if (protoProps) {
    _.extend(child.prototype, protoProps);
  }

  // Set a convenience property in case the parent's prototype is needed
  // later.
  child.__super__ = parent.prototype;

  return child;
};

ErrBreak.Model.extend = extend;

module.exports = ErrBreak;
