var support = require("support").exec(__filename);

var ErrBreak = support.require("server/lib/errbreak");

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

  describe("constructor", function() {
    it("allows a user to pass in attributes to be initialized with", function() {
      var model = new ErrBreak.Model({foo: "bar"});
      expect(model.get("foo")).toEqual("bar");
    });
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

  describe(".extend", function() {
    it("returns a new constructor/proto object", function() {
      var SubClass = ErrBreak.Model.extend();
      expect(SubClass.prototype.constructor.__super__).toEqual(ErrBreak.Model.prototype);
    });

    it("allows 'class' inheritance from parent to child", function() {
      var ParentClass = ErrBreak.Model.extend({
        foo: function() {
          return "bar";
        }
      });

      var ChildClass = ParentClass.extend();
      var child = new ChildClass();
      expect(child.foo).toBeDefined();
      expect(child.foo()).toEqual("bar");
    });
  });

  describe("database connection", function() {
    describe("#count", function() {
      it("returns the database count", function(done) {
        var count;
        done();
      });
    });

    describe("#find", function() {

    });

    describe("#where", function() {

    });

    describe("#destroy", function() {

    });

    describe("#save", function() {
      it("persists the data in the database", function() {

      });
    });
  });
});
