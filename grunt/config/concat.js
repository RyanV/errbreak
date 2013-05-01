var _ = require("underscore")._,
  path = require("path");


var errBreakFiles = require("../../app/assets/javascripts/manifest.js");
errBreakFiles = _.map(errBreakFiles, function(f) {
  return path.join("app/assets/javascripts/", f);
});

var vendorFiles = require("../../vendor/assets/javascripts/manifest.js");
vendorFiles = _.map(vendorFiles, function(f) {
  return path.join("vendor/assets/javascripts/", f);
});

module.exports = {
  framework: {
    src: vendorFiles,
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
};
