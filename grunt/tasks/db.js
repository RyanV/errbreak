module.exports.create = function() {
  this.async();
  var env = require("./lib/env");
  var pg = require("pg");
  if (!env.isIn("development", "test")) {
    throw "Cannot run grunt db:create in " + env.name();
  }
  var config = grunt.file.readYAML("config/database.yml")[env.name()];
  var client = new pg.Client(config);
  client.connect();
  client.query("CREATE TABLE IF NOT EXISTS $1(id SERIAL PRIMARY KEY)", [config.database]);
};
