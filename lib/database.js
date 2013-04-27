var pg = require('pg').native
  , env = require("./env")
  , grunt = require("grunt")
  , config = process.env.DATABASE_URL || grunt.file.readYAML("config/database.yml")[env.name()]
  , client
  ;
module.exports.query = function(a, b, c) {
  client = new pg.Client(config);
  client.connect();
  var query = client.query(a, b, c);
  query.on('end', function() {
    client.end();
  });
};
