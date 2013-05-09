var support = require("support");
support.execFile(__filename);

var Database = support.require("lib/database.js");

describe("database", function() {
  var query, spy;
  beforeEach(function() {
    query = Database.insertInto("notifications");
    spy = spyOn(query, "_query").andCallThrough();
  });
  describe(".insert", function() {
    it("given one value", function() {
      query.value("foo", "bar");
      query.execute(function(err) {
        expect(spy).toHaveBeenCalled();
        expect(spy.mostRecentCall.args[0]).toEqual("INSERT INTO notifications(foo) VALUES('bar')");
        expect(spy.mostRecentCall.args[1]).toEqual([]);
        done();
      });
    });

    it("given mutliple values", function() {

    });
  });

  it("#insert", function(done) {

  });

  it("can pass in escape values", function() {

  });
});
