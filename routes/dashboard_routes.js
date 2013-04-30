var env = require("../lib/env"),
  grunt = require("grunt"),
  config = grunt.file.readYAML("config/database.yml")[env.name()],
  pg = require("pg"),
  client = new pg.Client(config);
client.connect();

module.exports = {
  index: function(req, res) {
    client.query("select * from notifications", function(err, result) {
      var rows = result.rows.map(function(row) {
        row.created_at = new Date(row.created_at).getTime();
        return row;
      });

      res.locals = {
        data: JSON.stringify({
          notifications: rows
        })
      };

      res.render("dashboard/index.hbs");
    });
  }
};
