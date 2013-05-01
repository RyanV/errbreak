var support = require("support");
support.execFile(__filename);

var ErrBreak = support.require("lib/errbreak");

describe("ErrBreak", function() {
  it("should be defined", function() {
    expect(ErrBreak).toBeTruthy();
  });
});

describe("ErrBreak.Model", function() {
  var model;

  beforeEach(function() {
    model = new ErrBreak.Model();
  });

  it("should be a function", function() {
    expect(ErrBreak.Model).toEqual(jasmine.any(Function));
  });

  it("#attributes", function() {
    expect(model.attributes).toEqual({});
  });

  describe("#initialize", function() {
    it("gets called when the constructor is invoked", function() {
      spyOn(ErrBreak.Model.prototype, "initialize").andCallThrough();
      new ErrBreak.Model();
      expect(ErrBreak.Model.prototype.initialize).toHaveBeenCalled();
    });
  });

  describe("#set", function() {
    it("sets a value to the models attributes", function() {
      model.set('foo', 'bar');
      expect(model.attributes.foo).toEqual('bar');
    });

    it("allows an object to be passed in", function() {
      model.set({a: "b", c: "d"});
      expect(model.get("a")).toEqual("b");
      expect(model.get("c")).toEqual("d");
    });
  });

  describe("#get", function() {
    it("retreives an attribute from the models attributes", function() {
      model.set('foo', 'bar');
      expect(model.attributes.foo).toEqual('bar');
      expect(model.get('foo')).toEqual('bar');
    });
  });

  describe("#unset", function() {
    it("unsets an attribute from models attributes", function() {
      model.set('foo', 'bar');
      expect(model.attributes.foo).toEqual('bar');
      model.unset('foo');
      expect(model.get('foo')).toBeFalsy();
    });
  });

  describe("#clear", function() {
    it("removes all attributes from the model", function() {
      model.set({a: "b", c: "d"});
      expect(model.get("a")).toEqual("b");
      expect(model.get("c")).toEqual("d");
      model.clear();
      expect(model.get("a")).toBeFalsy();
      expect(model.get("c")).toBeFalsy();
    });
  });
});


