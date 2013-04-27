module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      files: ["app/**/*.js", "server.js"],
      tasks: ["server:start"]
    }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");

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
