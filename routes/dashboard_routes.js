var path = require("path"),
  Notification = require(path.join(__dirname, "../app/models/notification"));

module.exports = {
  index: function(req, res) {
    Notification.find({}, function(err, results) {
      var data = JSON.stringify({ notifications: results });
      res.locals = { data: data };
      res.render("dashboard/index.hbs");
    });
  }
};
