var YAML = require("yaml-node"),
  Utils = require("../lib/utils"),
  path = require("path"),
  env = require("../lib/env");


var Database = module.exports.Database = {
  connectionOptions: function(environment) {
    var yamlConfiguration = YAML.read(path.join(__dirname, "database.yml"));
    return environment ? yamlConfiguration[environment] : yamlConfiguration;
  },
  connectionString: function() {
    if (process.env.DATABASE_URL) {
      return process.env.DATABASE_URL
    } else {
      var dbConfig = Database.connectionOptions(env.name());
      return Utils.Str.format("postgres://{0}@{1}:{2}/{3}", dbConfig.user, dbConfig.host, dbConfig.port, dbConfig.database);
    }
  }
};


//module.exports.initDb = function() {
//
//};
