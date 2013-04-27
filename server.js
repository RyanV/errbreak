var path = require('path'),
  dashboard = require("./app/controllers/dashboard"),
  express = require("express"),
  app = express(),
  PORT = process.env.PORT || "3000";

app.configure(function() {
  app.set("views", path.join("app", "views"));
  app.set('view engine', 'hbs');
  app.use(express.static(__dirname+'/public'));
});

app.get("/", dashboard.index);

app.listen(PORT, function() {
  console.log("Server started and listening on port: ")
});
