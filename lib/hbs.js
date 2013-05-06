var hbs = require("hbs"),
  path= require("path"),
  _ = require("underscore")._;

hbs.registerHelper("javascript_include_tag", function(arg) {
  var src = path.join("assets/javascripts", arg);
  return "<script type='text/javascript' src='/" + src + "'></script>";
});

hbs.registerHelper("stylesheet_link_tag", function(arg) {
  var src = path.join("assets/stylesheets", arg);
  return "<link rel='stylesheet' href='" + src + "'/>"
})

module.exports = hbs;
