var support = require("support").exec(__filename)
  , Str = support.require("server/lib/utils/str")
  ;

describe("Utils.Str", function() {
  describe("#format", function() {
    it("interpolates values into a string", function() {
      expect(Str.format("{0}-{1}-{2}", 9, 2, 5)).toEqual("9-2-5");
    });
  });
});
