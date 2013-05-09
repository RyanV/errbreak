exports = module.exports = {};

exports.javascripts = {
  "application.js": {
    loadPath: "application/javascripts",
    files: require("./application/javascripts/manifest")
  },
  "framework.js": {
    loadPath: "vendor/javascripts",
    files: require("./vendor/javascripts/manifest")
  }
};

exports.stylesheets = {
  "application.css": {
    loadPath: "/",
    files: [
      "vendor/stylesheets/bootstrap.min.css",
      "vendor/stylesheets/bootstrap-responsive.min.css",
      "vendor/stylesheets/font-awesome.min.css",
      "application/stylesheets/application.css"
    ]
  }
};

exports.templates = {
  "templates.js": {
    loadPath: "application/templates"
  }
};
