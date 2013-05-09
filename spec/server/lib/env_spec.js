var support = require("support").exec(__filename);

describe("env", function() {
  var env;
  beforeEach(function() {
    env = support.require("server/lib/env");
  });

  describe("isProduction", function() {
    it("returns true if environment is production", function() {
      spyOn(env, "name").andReturn("production");
      expect(env.isProduction()).toEqual(true);
    });
    it("returns false if environment is not production", function() {
      spyOn(env, "name").andReturn("development");
      expect(env.isProduction()).toEqual(false);
    });
  });

  describe("isDevelopment", function() {
    it("returns true if environment is development", function() {
      spyOn(env, "name").andReturn("development");
      expect(env.isDevelopment()).toEqual(true);
    });

    it("returns false if environment is not development", function(){
      spyOn(env, "name").andReturn("production");
      expect(env.isDevelopment()).toEqual(false);
    });
  });

  describe("isIn", function() {
    it("returns true if passed in arguments contain the current environment", function() {
      spyOn(env, "name").andReturn("development");
      expect(env.isIn("development")).toEqual(true);
      expect(env.isIn("development", "test")).toEqual(true);
      expect(env.isIn("production")).toEqual(false);
      expect(env.isIn("production", "staging")).toEqual(false);
    });
  });
});
