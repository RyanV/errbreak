var routes = require("./routes"),
  path = require('path'),
  express = require("express"),
  app = express(),
  env = require("./lib/env"),
  ErrBreak = require("./lib/errbreak"),
  Config = require("./config"),
  hbs = require("./lib/hbs"),
  PORT = 3000;


/**
 * Connect to the database using config/database.yml and
 * current environment
 */
ErrBreak.connect(Config.Database.connectionOptions());

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
  app.set('view engine', 'hbs');
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
  app.use(app.router);
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
app.get("/", routes.home.index);

app.get("/notifications", routes.dashboard.index);

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
app.post("/notifications", routes.notification.create);

// If development environment, create jasmine route for running html/client specs
if (env.isDevelopment()) {
  app.get("/jasmine", routes.jasmine.index);
}


app.listen(PORT, function() {
  console.log("Server started and listening on port: " + PORT)
});
