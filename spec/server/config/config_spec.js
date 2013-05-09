var support = require('support').exec(__filename);

var path = require('path')
  , Config = support.require("config")
  ;

describe("Config", function() {
  describe("Config.Database", function() {
    it("#yamlConfig", function() {
      var yml = Config.Database.connectionOptions();
      expect(yml.constructor.name).toEqual("Object");
      expect(yml.development).toBeDefined();
      expect(yml.test).toBeDefined();
    });

    it("#connectionString", function() {
      var connectionOptions = {
        database: "dbname",
        user: "user",
        password: null,
        port: 5432,
        host: 'localhost'
      };
      spyOn(Config.Database, 'connectionOptions').andReturn(connectionOptions);
      var str = Config.Database.connectionString();
      expect(Config.Database.connectionOptions).toHaveBeenCalledWith('test');
      expect(str).toEqual("postgres://user@localhost:5432/dbname");
    });
  })
});
