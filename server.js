var path = require('path'),
  express = require("express"),
  app = express(),
  env = require("./lib/env"),
//  PORT = process.env.PORT || 3000,
  grunt = require("grunt"),
  config = grunt.file.readYAML("config/database.yml")[env.name()],
  pg = require("pg"),
  client = new pg.Client(config);

client.connect();

app.configure(function() {
  app.set("views", path.join("app", "views"));
  app.set('view engine', 'hbs');
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
});

app.get("/", function(req, res) {
  client.query("select * from notifications", function(err, result) {
    var rows = result.rows.map(function(row) {
      row.created_at = new Date(row.created_at).getTime();
      return row;
    });
    res.locals = {
      notifications: rows
    };
    res.render("dashboard/index.hbs");
  });
});

app.post("/notifications", function(req, res) {
  var body = req.body;
  var message = body.message;
  var environment = body.environment;
  client.query("insert into notifications(message, environment) values($1, $2)", [message, environment], function(err) {
    res.status(200);
    if (err) {
      res.json({status: 500});
    } else {
      res.json({status: 200});
    }

    res.end();
  });
});

app.listen(80, function() {
  console.log("Server started and listening on port: " + 80)
});
