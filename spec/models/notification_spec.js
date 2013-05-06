var support = require("support");
support.execFile(__filename);

var pg = support.require("lib/database");

describe("LoggedError", function() {
  var Notification;
  beforeEach(function(done) {
    Notification = support.require("app/models/notification");
    Notification.destroy({}, function(err, result) {
      Notification.find({}, {count: true}, function(err, result) {
        expect(result.count).toEqual(0);
        done();
      });
    });
//    pg.query("delete from notifications", function() {
//      pg.query("SELECT * from notifications", function(err, result) {
//        expect(result.rowCount).toEqual(0);
//        done();
//      });
//    });
  });

  it("should be able to save", function(done) {
    Notification.create({}, function(err, result) {
      if (err) {
        throw err;
      } else {
        Notification.find({}, {count: true}, function(err, result) {
          expect(result.count).toEqual(1);
          done();
        });
      }
    });
  });
});
