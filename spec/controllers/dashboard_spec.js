require("jasmine-node-exec").exec(__filename);
var http = require("http");
var request = {
  get: function(path, callback) {
    var body = "";
    http.get(path, function(res) {
      res.on("data", function() {
        body += arguments[0];
      });
      res.on("end", function() {
        res.body = body;
        callback(res);
      });
    });
  }
}

describe("GET /", function() {
  it("should return success", function(done) {
    request.get("/", function(res) {
      expect(res.statusCode).toEqual(200);
      done();
    });
  });

  it("render the template", function(done) {
    request.get("/", function(res) {
      expect(res.body).toMatch("Errbreak");
      done();
    });
  });
});
