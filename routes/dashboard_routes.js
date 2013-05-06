var Config = require("../config"),
  Database = Config.Database;

module.exports = {
  index: function(req, res) {
    var connection = Database._connection;
    var Notifications = connection.models.notifications;
    Notifications.all(function(err, results) {
      console.info(results[0].created_at);
      res.locals = {
        data: JSON.stringify({
          notifications: results
        })
      };
      res.render("dashboard/index.hbs");
    });
  }
};
