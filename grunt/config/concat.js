var _ = require("underscore")._,
  path = require("path"),
  errBreakFiles = require("../../app/assets/javascripts/manifest.js");

errBreakFiles = _.map(errBreakFiles, function(f) {
  return path.join("app/assets/javascripts/", f);
});

module.exports = {
  framework: {
    src: [
      "vendor/assets/javascripts/jquery.min.js",
      "vendor/assets/javascripts/jquery-ui.min.js",
      "vendor/assets/javascripts/bootstrap.min.js",
      "vendor/assets/javascripts/underscore.js",
      "vendor/assets/javascripts/backbone.js",
      "vendor/assets/javascripts/handlebars.js",
      "vendor/assets/javascripts/moment.min.js",
      "vendor/assets/javascripts/ua-parser.min.js"
    ],
    dest: "public/assets/javascripts/framework.js"
  },
  errbreak: {
    src: errBreakFiles,
    dest: "public/assets/javascripts/application.js"
  },
  stylesheets: {
    src: [
      "vendor/assets/stylesheets/bootstrap.min.css",
      "vendor/assets/stylesheets/bootstrap-responsive.min.css",
      "vendor/assets/stylesheets/font-awesome.min.css",
      "app/assets/stylesheets/application.css"
    ],
    dest: "public/assets/stylesheets/application.css"
  }
}
