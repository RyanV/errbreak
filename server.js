var path = require('path'),
  dashboard = require("./app/controllers/dashboard"),
  express = require("express"),
  app = express();

app.configure(function() {
  app.set("views", path.join("app", "views"));
  app.set('view engine', 'hbs');
  app.use(express.static(__dirname+'/public'));
});

app.get("/", dashboard.index);

app.listen(3000);
console.info("Server started and listening on port 3000");
