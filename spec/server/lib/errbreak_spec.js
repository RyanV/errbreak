var support = require("support");
support.execFile(__filename);

var ErrBreak = support.require("lib/errbreak");

describe("ErrBreak", function() {
  it("should be defined", function() {
    expect(ErrBreak).toBeTruthy();
  });

  describe("_connection", function() {
    var connectionOptions = {
      user: "postgres",
      port: 5432,
      database: "errbreak_test",
      host: "localhost"
    };

    beforeEach(function() {
      expect(ErrBreak._connection).toBeFalsy();
      ErrBreak.connect(connectionOptions);
    });

    it("should set the conection instance", function(done) {
      expect(ErrBreak._connection).toBeTruthy();
      done();
    });
  });
});
