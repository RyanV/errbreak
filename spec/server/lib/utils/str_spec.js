require("jasmine-node-exec").exec(__filename);
var support = require("support")
  , Str = support.require("lib/utils/str")
  ;

describe("Utils.Str", function() {
  describe("#format", function() {
    it("interpolates values into a string", function() {
      expect(Str.format("{0}-{1}-{2}", 9, 2, 5)).toEqual("9-2-5");
    });
  });
});
