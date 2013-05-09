var support = require("support").exec(__filename);

var ErrBreak = support.require("server/lib/errbreak");

describe("ErrBreak", function() {
  it("should be defined", function() {
    expect(ErrBreak).toBeTruthy();
  });

  describe("_connection", function() {
    it("should set the conection instance", function(done) {
      ErrBreak.disconnect();
      var connectionOptions = {
        user: "postgres",
        port: 5432,
        database: "errbreak_test",
        host: "localhost"
      };

      expect(ErrBreak._connected).toEqual(false);
      ErrBreak.connect(connectionOptions);
      expect(ErrBreak._connected).toEqual(true);
      done();
    });
  });
});
