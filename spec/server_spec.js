var support = require("support");
support.execFile(__filename);

var request = support.request,
  grunt = require("grunt"),
  config = grunt.file.readYAML("config/database.yml")["development"],
  pg = require("pg"),
  client = new pg.Client(config);

client.connect();

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

describe("POST /notifications", function() {
  var data;
  beforeEach(function(done) {
    client.query("delete from notifications", done)
  });

  it("should respond with success", function(done) {
    data = {
      environment: "test"
    };
    request.post("/notifications", data, function(res) {
      expect(res.statusCode).toEqual(200);
      done()
    });
  });

  it("should return a request status", function(done) {
    data = {
      environment: "test"
    };
    request.post("/notifications", data, function(res) {
      expect(JSON.parse(res.body)).toEqual({status: 200});
      done();
    });
  });

  it("should create a new record", function(done) {
    data = {
      environment: "test"
    };

    client.query("select * from notifications", function(err, result) {
      expect(result.rowCount).toEqual(0);
      request.post("/notifications", data, function(res) {
        expect(JSON.parse(res.body)).toEqual({status: 200});
        client.query("select * from notifications", [],function(err, result) {
          expect(result.rowCount).toEqual(1);
          done();
        });
      });
    })
  });
});
