var support = require("support").exec(__filename);

var ErrBreak = support.require("server/lib/errbreak");

describe("ErrBreak.Validator", function() {
  var Validator, Model;
  var validator, model;
  var validationData;
  var actualSchema;

  beforeEach(function(done) {
    actualSchema = {
      id: { data_type: 'integer' },
      message: { data_type: 'text' },
      environment: { data_type: 'text' },
      user_agent: { data_type: 'text' },
      url: { data_type: 'text' },
      resolved: { data_type: 'boolean' },
      stack_trace: { data_type: 'json' },
      created_at: { data_type: 'timestamp without time zone' },
      updated_at: { data_type: 'timestamp without time zone' }
    };

    Validator = ErrBreak.Validator.extend(validationData || {});
    validator = new Validator("notifications");
    Model = ErrBreak.Model.extend({
      validator: validator
    });
    model = new Model();
    waitsFor(function() {
      return _.size(validator._schema) === _.size(actualSchema);
    }, "validator._schema to populate");
    runs(done);
  });

  it("requires a tableName on initialization", function() {
    expect(function() {
      new Validator();
    }).toThrow("Validator must be initialized with a table name");
    expect(function() {
      new Validator("notifications");
    }).not.toThrow();
  });

  it("should set _tableName", function() {
    expect(validator._tableName).toEqual("notifications");
  });

  describe("Validator.prototype._schema", function() {
    it("defines the table schema given by postgres", function(done) {
      expect(validator._schema).toEqual(actualSchema);
      done();
    });
  });

  it("#_columnData", function() {
    expect(validator._columnData("id")).toEqual(actualSchema.id);
    expect(validator._columnData("message")).toEqual(actualSchema.message);
  });

  it("#_columnDataType", function() {
    expect(validator._columnDataType("message")).toEqual("text");
  });

  describe("#_validateDataType", function() {
    it("returns nothing for valid dataTypes", function() {
      expect(validator._validateDataType("message", "foo")).toBeUndefined();
      expect(validator._validateDataType("id", 1)).toBeUndefined();
    });

    it("returns an error as a string for invalid data types", function() {
      expect(validator._validateDataType("message", 1)).toEqual("Invalid data type 'number' for column: message");
      expect(validator._validateDataType("message", {})).toEqual("Invalid data type 'object' for column: message");
      expect(validator._validateDataType("id", "not an integer")).toEqual("Invalid data type 'string' for column: id");
    });
  });

  describe("#validate", function() {
    it("defaults to data type validations based on schema", function(done) {
      var errors;
      errors = validator.validate("message", "foo");
      expect(errors.length).toEqual(0);
      errors = validator.validate("message", 1);
      expect(errors.length).toEqual(1);
      done();
    });
  });
});
