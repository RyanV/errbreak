var ErrBreak = require("../../lib/errbreak");

var Notification = ErrBreak.Model.extend({
  tableName: "notifications",
  primaryKey: "id"
});

module.exports = Notification;
