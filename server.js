var path = require('path'),
  _ = require("underscore")._,
  express = require("express"),
  app = express(),
  env = require("./lib/env"),
  grunt = require("grunt"),
  config = grunt.file.readYAML("config/database.yml")[env.name()],
  glob = require("glob"),
  pg = require("pg"),
  client = new pg.Client(config);

client.connect();

/**
 *
 * Cross Origin Resource Sharing (CORS) Middleware
 */
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
  next();
};

/**
 * App Configuration for all environments
 */
app.configure(function() {
  app.set("views", path.join("app", "views"));
  app.set('view engine', 'hbs');
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
  app.use(allowCrossDomain);
});

/**
 *  App configuration for development environment
 */
app.configure("development", function() {
  app.use(express.static(__dirname + '/spec/client/'));
});

/**
 * Admin interface
 */
app.get("/", function(req, res) {
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
});

/**
 * Main post endpoint for notifications/errors
 * post body ex:
 *
 *    {
 *      message: "Error Message",
 *      environment: "Acceptance",
 *      user_agent: "user agent string",
 *      stack_trace: ["array", "of", "stack", "trace", "lines"]
 *    }
 *
 */
app.post("/notifications", function(req, res) {
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
});

// If development environment, create jasmine route for running html/client specs
if (env.isDevelopment()) {
  app.get("/jasmine", function(req, res) {
    glob("spec/client/**/*_spec.js", function(err, files) {
      var f = _.map(files, function(file) {
        return file.replace("spec/client/", "");
      });
      res.locals = {spec_files: f};
      res.render("spec_runner.hbs");
    });
  });
}


app.listen(80, function() {
  console.log("Server started and listening on port: " + 80)
});
