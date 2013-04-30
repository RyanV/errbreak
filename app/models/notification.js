var Model = require("../models");

var Notification = Model.extend({
  tableName: "notifications"
});

module.exports = Notification;
