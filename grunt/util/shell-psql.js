var shell = require('shelljs')
  , optimist = require('optimist')
  , _ = require("underscore")._
  , format = require("util").format;

var queries = {
  CREATE_TABLE: "'CREATE TABLE IF NOT EXISTS %s (id SERIAL PRIMARY KEY)'",
  DROP_TABLE: "'DROP TABLE %s'",
  CREATE_DATABASE: "'CREATE DATABASE IF NOT EXISTS %s'",
  DROP_DATABASE: "'DROP DATABASE %s'"
};

var queryString = function(queryType, value) {
  return format(queries[queryType], value);
};

exports = module.exports = function() {
  var options, _cmd, _psql;
  options = optimist.parse(Array.prototype.slice.call(arguments));
  _cmd = ["psql"];
  _cmd.push("-d", options.d || "postgres");
  _cmd.push("-U", options.U || "postgres");
  if (options.f) _cmd.push("-f", options.f);

  _psql = {
    createTable: function(table) {
      var cmd = queryString('CREATE_TABLE', table);
      _psql.set("-c", cmd);
      _psql.exec();
    },
    dropTable: function(table) {
      var cmd = queryString('DROP_TABLE', table);
      _psql.set("-c", cmd);
      _psql.exec();
    },
    dropDatabase: function(database) {
      if (database === 'postgres') {
        throw "PsqlSecurityError: Unable to drop requested database";
      } else {
        var cmd = queryString('DROP_DATABASE', database);
        _psql.set("-c", cmd);
        _psql.exec();
      }
    },
    createDatabase: function(database) {
      if (database === 'postgres') {
        throw "PsqlSecurityError: Unable to create requested database";
      } else {
        var cmd = queryString('CREATE_DATABASE', database);
        _psql.set("-c", cmd);
        _psql.exec();
      }
    },
    execFile: function(file) {
      if (file) {
        _psql.set("-f", file);
      } else {
        if (!_psql.get('-f')) {
          throw 'File not found!'
        }
      }
      _psql.exec();
    },
    exec: function(cmd) {
      var command = cmd ? format("psql -c '%s'", cmd) : _cmd.join(" ");
      return exports._exec(command);
    },
    _exec: function(cmd) {
      exports.exec(cmd)
    },
    get: function(flag) {
      var idx = _cmd.indexOf(flag);
      return (-1 === idx) ? null : _cmd[idx + 1];
    },
    set: function(flag, value) {
      var idx = _cmd.indexOf(flag);
      (-1 === idx) ? _cmd.push(flag, value) : _cmd.splice(idx, idx + 2, flag, value);
      return _psql;
    }
  };
  return _psql;
};

exports.exec = function(cmd) {
  var command = format("psql -c '%s'", cmd);
  exports._exec(command);
};

exports._exec = function(cmd) {
  return shell.exec(cmd);
};
