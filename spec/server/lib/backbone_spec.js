var support = require("support").exec(__filename);

var Backbone = support.require("server/lib/backbone");

var TestModel = Backbone.Model.extend({
  tableName: "notifications",
  validate: function() {
  }
});

// pending until i figureout which orm to use
// might delete since errbreak.model is doing well on itsown
xdescribe("Backbone", function() {
  var testModel;
  var asyncSpy, callbackSpy, tableName;
  var pgClient;

  function tearDown(cb) {
    deleteAll(function(err, result) {
      if (err) {
        throw err;
      }
      rowCountShouldEql(0, cb);
    });
  }

  function deleteAll(cb) {
    pgClient.query("delete from " + tableName, cb);
  }

  function getRowCount(cb) {
    pgClient.query("select * from " + tableName, cb);
  }

  function rowCountShouldEql(intVal, cb) {
    getRowCount(function(err, result) {
      if (err) {
        throw err;
      }
      expect(result.rowCount).toEqual(intVal);
      cb();
    });
  }

  beforeEach(function(done) {
//    process.env.NODE_ENV = "test";
    pgClient = support.require("server/lib/database").client();
    testModel = new TestModel({foo: "bar", message: "TEST"});
    tableName = testModel.tableName;
    asyncSpy = spyOn(testModel, "async").andCallThrough();
    callbackSpy = jasmine.createSpy("callback");
    pgClient.query("delete from " + tableName, done);
  });

  afterEach(function(done) {
    pgClient.query("delete from " + tableName, function() {
//      process.env.NODE_ENV = "development";
      done();
    });
  });

  describe("create", function() {
    it("should properly pass a callback to Backbone.async", function(done) {
      testModel.save({}, callbackSpy);
      expect(asyncSpy).toHaveBeenCalled();
      expect(asyncSpy).toHaveBeenCalledWith("create", testModel, callbackSpy);
      done();
    });

    it("should by default, run validations", function(done) {
      var validationSpy = spyOn(testModel, "validate").andCallThrough();
      testModel.save({}, callbackSpy);
      expect(validationSpy).toHaveBeenCalled();
      done();
    });

    it("should not run validations with options.validate == false", function(done) {
      var validationSpy = spyOn(testModel, "validate").andCallThrough();
      testModel.save({validate: false}, callbackSpy);
      expect(validationSpy).not.toHaveBeenCalled();
      done();
    });

    it("should create a new row in the database", function(done) {
      testModel.save({}, function(err, result) {
        rowCountShouldEql(1, done);
      });
    });

    it("should set the id to the model", function(done) {
      testModel.save({}, function(err, model) {
        rowCountShouldEql(1, function() {
          expect(testModel.get("id")).toEqual(jasmine.any(Number));
          done();
        });
      });
    });

    it("should properly persist the message attribute", function(done) {
      testModel.set("message", "RANDOM");
      testModel.save({}, function(err, model) {
        pgClient.query("select * from " + tableName, [], function(err, result) {
          expect(result.rows[0].message).toEqual("RANDOM");
          done();
        });
      });
    });
  });

  describe("destroy", function() {
    beforeEach(function(done) {
      testModel.save(function() {
        rowCountShouldEql(1, done);
      });
    });

    it("should delete the model from the database", function(done) {
      testModel.destroy(function() {
        rowCountShouldEql(0, done);
      });
    });
  });

  describe("update", function() {
    beforeEach(function(done) {
      testModel.set("message", "value 1");
      testModel.save(function() {
        rowCountShouldEql(1, done);
      });
    });

    it("should call async with the proper method", function(done) {
      testModel.set("message", "value 2");
      testModel.save({}, function(err, model) {
        expect(asyncSpy).toHaveBeenCalled();
        expect(asyncSpy.mostRecentCall.args[0]).toEqual("update");
        done();
      });
    });

    it("should properly update a value in the database", function(done) {
      testModel.set("message", "value 2");
      testModel.save({}, function(err, model) {
        pgClient.query("select * from " + tableName + " where id = $1", [testModel.get("id")], function(err, result) {
          expect(result.rows[0].message).toEqual("value 2");
          done();
        });
      });
    });
  });
});
