var _ = require("underscore")._;
var Str = {
  format: function() {
    if (arguments.length == 0) return null;
    return _.inject(_.rest(arguments), function(str, arg, i) {
      return str.replace(new RegExp("\\{" + i + "\\}", 'gm'), arg)
    }, arguments[0].toString());
  }
};

module.exports = Str;
