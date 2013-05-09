module.exports = {
  format: function() {
    var a = arguments[0].toString();
    for (var b = 1; b < arguments.length; ++b) {
      var c = new RegExp("\\{" + (b - 1) + "\\}", "gm");
      a = a.replace(c, arguments[b]);
    }
    return a;
  }
};
