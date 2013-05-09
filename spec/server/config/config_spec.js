require("jasmine-node-exec").exec(__filename);
var path = require('path')
  , configPath = path.join(__dirname, "../../config")
  , Config = require(configPath)
  , Database = Config.Database
  ;

describe("Config", function() {
  describe("Config.Database", function() {
    it("#yamlConfig", function() {
      var yml = Database.connectionOptions();
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
      spyOn(Database, 'connectionOptions').andReturn(connectionOptions);
      var str = Database.connectionString();
      expect(Database.connectionOptions).toHaveBeenCalledWith('test');
      expect(str).toEqual("postgres://user@localhost:5432/dbname");
    });
  })
});
