var slice = Array.prototype.slice;

var environment = module.exports = {
  name: function() {
    return process.env.NODE_ENV || "development";
  },
  isDevelopment: function() {
    return "development" === environment.name();
  },
  isProduction: function() {
    return "production" === environment.name();
  },
  isIn: function() {
    var env = environment.name();
    var _isIn = false;

    if (!arguments.length) {
      return false;
    }

    slice.call(arguments).forEach(function(item) {
      if (item === env) {
        _isIn = true;
      }
    });
    return _isIn;
  }
};
