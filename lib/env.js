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
    var ary, _isIn = false, env = environment.name();
    if (!arguments.length) {
      return false;
    }
    ary = Array.prototype.slice.call(arguments);
    ary.forEach(function(item) {
      if (item === env) {
        _isIn = true;
      }
    });
    return _isIn;
  }
};
