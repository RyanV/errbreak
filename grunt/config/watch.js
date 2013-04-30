module.exports = {
  assets: {
    files: [
      "vendor/assets/javascripts/**/*.js",
      "vendor/assets/stylesheets/**/*.css",
      "app/assets/javascripts/**/*.js",
      "app/assets/stylesheets/**/*.css"
    ],
    tasks: ["concat"]
  }
};
