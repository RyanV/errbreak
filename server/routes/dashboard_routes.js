var path = require("path"),
  Notification = require(path.join(__dirname, "../models/notification")),
  USE_BACKBONE = false;

module.exports = {
  index: function(req, res) {
    Notification.find({}, function(err, results) {
      if (USE_BACKBONE) {
        var data = JSON.stringify({ notifications: results });
        res.locals = { data: data };
        res.render("dashboard/index.hbs");
      } else {
        results.forEach(function(res, idx, obj) {
          obj[idx].relative_path = "/" + path.join("notifications", res.id.toString());
          obj[idx].created_at = new Date(res.created_at).getTime();
          obj[idx].updated_at = new Date(res.updated_at).getTime();
        });
        res.locals = {notifications: results};
        res.render("dashboard/no_backbone_index.hbs");
      }
    });
  }
};
