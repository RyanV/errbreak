describe("ErrBreak.singleton", function() {
  var TestKlass;

  beforeEach(function() {
    TestKlass = Backbone.Model.extend({});
    TestKlass._instance = undefined;
  });

  afterEach(function() {
    TestKlass._instance = undefined;
  });

  it("defines a #getInstance function that returns the instance", function() {
    ErrBreak.singleton(TestKlass);
    expect(TestKlass.getInstance).toBeDefined();
    var instance = TestKlass.getInstance();
    expect(instance instanceof TestKlass).toEqual(true);
  });
});
