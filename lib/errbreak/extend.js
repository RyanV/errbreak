module.exports = function(protoProps, staticProps) {
  var _ = require("underscore")._;

  /**
   * require ErrBreak baseclass and connect to the database
   * if not already connected (there is a safeguard from multiple connects).
   * ErrBreak.connect returns ErrBreak Object
   */
  var ErrBreak = require("../errbreak.js").connect();

  var parent = this;
  var child;

  /**
   * The constructor function for the new subclass is either defined by you
   * (the "constructor" property in your `extend` definition), or defaulted
   * by us to simply call the parent's constructor.
   */
  if (protoProps && _.has(protoProps, 'constructor')) {
    child = protoProps.constructor;
  } else {
    child = function() {
      return parent.apply(this, arguments);
    };
  }

  /**
   * connectionProxyBase includes
   *   methods:
   *     ['create', 'destroy', 'extend', 'find', 'findOne', 'truncate', 'update']
   *   properties:
   *     ['client']
   *
   * connectionProxyBase.extend uses _.extend and overrides SubClass.prototype.extend
   * extract extend method to prevent the override
   */
  var connectionProxyBase = _.extend({}, ErrBreak.connectionProxy().Base);
  delete connectionProxyBase.extend;

  /**
   * Add static properties to the constructor function, if supplied.
   * extends database connection methods from FastLegS.Base instance
   * into subclass static properties
   */
  _.extend(child, parent, connectionProxyBase, staticProps);

  /**
   * Set the prototype chain to inherit from `parent`, without calling
   * `parent`'s constructor function.
   * @constructor
   */
  var Surrogate = function() {
    this.constructor = child;
  };

  Surrogate.prototype = parent.prototype;
  child.prototype = new Surrogate();

  /**
   * Add prototype properties (instance properties) to the subclass,
   * if supplied.
   */
  if (protoProps) {
    _.extend(child.prototype, protoProps);
  }

  /**
   * Set a convenience property in case the parent's prototype is needed
   * later.
   */
  child.__super__ = parent.prototype;

  return child;
};
