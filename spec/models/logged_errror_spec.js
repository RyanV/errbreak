var support = require("support");
support.execFile(__filename);

var pg = support.require("lib/database");

describe("LoggedError", function() {
  var LoggedError;
  beforeEach(function(done) {
    process.env.NODE_ENV = "test";
    LoggedError = support.require("app/models/logged_error")
    pg.query("SELECT * from logged_errors", function(err, result) {
      expect(result.rowCount).toEqual(0);
      done();
    });
  });

  afterEach(function() {
    process.env.NODE_ENV = "development";
  });

  it("should be able to save", function(done) {
    var loggedError = new LoggedError();
    loggedError.save();
    pg.query("SELECT * from logged_errors", function(err, result) {
      expect(result.rowCount).toEqual(1);
      done();
    })
  });
});
