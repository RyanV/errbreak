module.exports = function(grunt) {
  var appFiles = require("./app/assets/javascripts/manifest.js");
  grunt.initConfig({
    concat: require("./grunt/config/concat"),
    watch: require("./grunt/config/watch"),
    jshint: require("./grunt/config/jshint")
  });

  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-jshint");

  grunt.registerTask("default", ["jshint:beforeConcat"]);

  grunt.registerTask("build:templates", "builds templates", function() {
    require("kexec")("bin/compile_templates.sh")
  });

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
