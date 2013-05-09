var ErrBreak = require("../lib/errbreak");

var Notification = module.exports = ErrBreak.Model.extend({
}, {
  tableName: "notifications",
  primaryKey: "id"
});
