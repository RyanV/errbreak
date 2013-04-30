var support = require("support");
support.execFile(__filename);

var pg = support.require("lib/database");

describe("LoggedError", function() {
  var Notification;
  beforeEach(function(done) {
    process.env.NODE_ENV = "test";
    Notification = support.require("app/models/notification");
    pg.query("delete from notifications", function() {
      pg.query("SELECT * from notifications", function(err, result) {
        expect(result.rowCount).toEqual(0);
        done();
      });
    });
  });

  afterEach(function() {
    process.env.NODE_ENV = "development";
  });

  it("should be able to save", function(done) {
    var loggedError = new Notification();
    loggedError.save({},function(err, model){
      if (err) {
        throw err;
      } else {
        pg.query("SELECT * from notifications", function(err, result) {
          expect(result.rowCount).toEqual(1);
          done();
        });
      }
    });
  });
});
