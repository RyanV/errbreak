var env = require("../lib/env"),
  grunt = require("grunt"),
  config = grunt.file.readYAML("config/database.yml")[env.name()],
  pg = require("pg"),
  client = new pg.Client(config);
client.connect();

module.exports = {
  create: function(req, res) {
    var body = req.body,
      message = body.message || null,
      environment = body.environment || null,
      user_agent = body.user_agent || null,
      stack_trace = body.stack_trace;

    if (stack_trace) {
      try {
        stack_trace = JSON.stringify(body.stack_trace)
      } catch (e) {
        stack_trace = null;
      }
    } else {
      stack_trace = null;
    }

    client.query("INSERT INTO notifications" +
      "(message, environment, user_agent, stack_trace, created_at, updated_at) " +
      "VALUES($1, $2, $3, $4, now(), now())",
      [message, environment, user_agent, stack_trace],
      function(err) {
        res.status(200);
        if (err) {
          res.json({status: 500});
        } else {
          res.json({status: 200});
        }
        res.end();
      });
  }
};
