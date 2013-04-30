module.exports = {
  assets: {
    files: [
      "vendor/assets/javascripts/**/*.js",
      "vendor/assets/stylesheets/**/*.css",
      "app/assets/javascripts/**/*.js",
      "app/assets/stylesheets/**/*.css"
    ],
    tasks: ["concat"]
  },
  templates: {
    files: [
      "app/assets/templates/**/*.hbs"
    ],
    tasks: ["build:templates"]
  }
};
