module.exports = {
  framework: {
    src: [
      "vendor/assets/javascripts/jquery.min.js",
      "vendor/assets/javascripts/jquery-ui.min.js",
      "vendor/assets/javascripts/bootstrap.min.js",
      "vendor/assets/javascripts/underscore.js",
      "node_modules/backbone/backbone.min.js",
      "vendor/assets/javascripts/handlebars.js",
      "vendor/assets/javascripts/moment.js"
    ],
    dest: "public/assets/javascripts/framework.js"
  },
  errbreak: {
    src: [
      "app/assets/javascripts/application.js"
    ],
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
