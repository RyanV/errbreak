var psql = require("../util/shell-psql")
  , slice = Array.prototype.slice
  , DATABASES = ["errbreak_test", "errbreak_dev"];

/**
 * basic database methods.  only runs single grouped commands
 * @type {Object}
 * @api private
 */
var db = {
  create: function(database) {
    psql().createDatabase(database);
  },
  drop: function(database) {
    psql().dropDatabase(database);
  },
  prepare: function(database) {
    db.drop(database);
    db.create(database);
    db.migrate(database);
  },
  migrate: function(database) {
    psql('-d', database).execFile("server/db/structure.sql");
  },
  seed: function(database) {
    psql('-d', database).execFile("server/db/seed.sql");
  }
};

/**
 * allows function calls with listed arguments instead of array
 * if arguments are not passed defaults to the constant DATABASES
 * @param args {arguments}
 * @return {Array}
 * @api private
 */
function processArgs(args) {
  return args.length ? slice.call(args) : DATABASES;
}

/**
 * exposes public api (tasks for grunt)
 * @type {Object}
 * @api public
 */
module.exports = {
  create: function() {
    processArgs(arguments).forEach(db.create);
  },
  drop: function() {
    processArgs(arguments).forEach(db.drop);
  },
  testPrepare: function() {
    db.prepare('errbreak_test');
  },
  migrate: function() {
    processArgs(arguments).forEach(db.migrate);
  },
  /**
   * seeds the development database
   * @param times {Number} number of times to run the seed file
   * @api public
   */
  seed: function(times) {
    for (var i = 0; i < (times || 1); i++) {
      db.seed('errbreak_dev');
    }
  }
};
