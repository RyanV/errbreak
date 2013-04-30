module.exports = function(grunt) {
  grunt.initConfig({
    concat: {
      framework: {
        src: [
          "vendor/assets/javascripts/jquery.min.js",
          "vendor/assets/javascripts/jquery-ui.min.js",
          "vendor/assets/javascripts/bootstrap.min.js",
          "node_modules/underscore/underscore.min.js",
          "node_modules/backbone/backbone.min.js"
        ],
        dest: "public/assets/javascripts/framework.js"
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
    },
    watch: {
      assets: {
        files: [
          "vendor/assets/javascripts/**/*.js",
          "vendor/assets/stylesheets/**/*.css",
          "app/assets/javascripts/**/*.js",
          "app/assets/stylesheets/**/*.css"
        ],
        tasks: ["concat"]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-watch");

  var build = require("./grunt/tasks/build");
  grunt.registerTask("build:assets",
    "Builds assets for client side use",
    build.assets
  );

  grunt.registerTask("build:vendor",
    "Builds vendor files for client side use",
    build.vendor
  );


  grunt.registerTask("db:create", "creates the database", function() {
    this.async();
    var env = require("./lib/env");
    var pg = require("pg");
    if (!env.isIn("development", "test")) {
      throw "Cannot run grunt db:create in " + env.name();
    }
    var config = grunt.file.readYAML("config/database.yml")[env.name()];
    client = new pg.Client(config);
    client.connect();
    client.query("CREATE TABLE IF NOT EXISTS $1(id SERIAL PRIMARY KEY)", [config.database]);
  });
};
