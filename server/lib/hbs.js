var hbs = require("hbs"),
  path= require("path"),
  Utils = require("./utils"),
  format = Utils.Str.format,
  _ = require("underscore")._;

hbs.registerHelper("javascript_include_tag", function(arg) {
  var src = path.join("assets/javascripts", arg);
  return format("<script type='text/javascript' src='/{0}'></script>", src);
});

hbs.registerHelper("stylesheet_link_tag", function(arg) {
  var src = path.join("assets/stylesheets", arg);
  return format("<link rel='stylesheet' href='{0}'/>", src);
});

hbs.registerHelper("link_to", function(text, href) {
  return format("<a href='{0}'>{1}</a>", href, text);
});

module.exports = hbs;
