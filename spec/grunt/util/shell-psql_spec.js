var support = require("support").exec(__filename);

describe("shell-psql", function() {
  var psql, execSpy;

  beforeEach(function() {
    psql = support.require("grunt/util/shell-psql");
    expect(typeof psql.exec).toEqual('function');
    expect(typeof psql._exec).toEqual('function');
    execSpy = spyOn(psql, '_exec');
  });

  it("exec runs the psql command", function() {
    psql.exec('CREATE TABLE foo');
    expect(execSpy).toHaveBeenCalledWith("psql -c 'CREATE TABLE foo'");
  });

  describe("passing arguments to psql as a function", function() {
    it("returns an object", function() {
      expect(typeof psql()).toEqual("object");
    });

    it("builds defaults", function() {
      var builder = psql();

    });

    it("calling psql as a function", function() {
      var builder = psql("-d", "dbname");
      builder.exec();
      var command = execSpy.mostRecentCall.args[0];
      expect(command).toMatch(/^psql/)
      expect(command).toMatch(/\s+-d dbname\s*/)
    });

    describe("#dropTable", function() {
      it("generates an appropriate query string", function(){
        var builder = psql();
        builder.dropTable('notifications');
        var command = execSpy.mostRecentCall.args[0];
        expect(command).toEqual("psql -d postgres -U postgres -c 'DROP TABLE notifications'");
      });
    });

    describe("#dropDatabase", function() {
      it("if database is set to 'postgres' will throw an error", function() {
        var builder = psql();
        expect(function() {
          builder.dropDatabase('postgres');
        }).toThrow("PsqlSecurityError: Unable to drop requested database")
      });

      it("if database is set to another database it does not throw an error", function() {
        var builder = psql();
        expect(function() {
          builder.dropDatabase('not_postgres');
        }).not.toThrow()
      });

      it("runs the right query", function() {
        psql().dropDatabase('foo');
        var command = execSpy.mostRecentCall.args[0];
        expect(command).toEqual("psql -d postgres -U postgres -c 'DROP DATABASE foo'");
      });
    });

    describe("#createDatabase", function() {
      it("runs the right query", function() {
        psql().createDatabase('foo');
        var command = execSpy.mostRecentCall.args[0];
        expect(command).toEqual("psql -d postgres -U postgres -c 'CREATE DATABASE IF NOT EXISTS foo'");
      });
    });

    describe("#get", function() {
      it("if flag exists, retrieves an argument value", function() {
        var builder = psql("-d", "dbname");
        expect(builder.get("-d")).toEqual("dbname");
      });

      it("if flag doesnt exists, returns null", function() {
        var builder = psql("-d", "dbname");
        expect(builder.get("-r")).toBeNull();
      });
    });

    describe("#set", function() {
      it("sets arguments to be passed in to the command", function() {
        var builder = psql("-d", "dbname");
        builder.set('-f', 'file.sql');
        expect(builder.get("-f")).toEqual("file.sql");
        builder.exec();
        var command = execSpy.mostRecentCall.args[0];
        expect(command).toMatch(/^psql/)
        expect(command).toMatch(/\s+-f file.sql\s*/)
      });

      it("overwrites an argument if it exists", function() {
        var builder = psql("-d", "dbname");
        expect(builder.get("-d")).toEqual("dbname");
        builder.set("-d", "anotherDbName");
        expect(builder.get("-d")).toEqual("anotherDbName");
      });
    });

    describe("#execFile", function() {
      var expected = "psql -d postgres -U postgres -f path/to/file.sql";

      it("runs if file is passed in as options", function() {
        var builder = psql("-f", "path/to/file.sql");
        builder.execFile();
        var command = execSpy.mostRecentCall.args[0];
        expect(command).toEqual(expected);
      });

      it("runs if file is passed in as an argument", function() {
        psql().execFile("path/to/file.sql");
        var command = execSpy.mostRecentCall.args[0];
        expect(command).toEqual(expected);
      });

      it("throws an error if file has not been set", function() {
        expect(function() {
          psql().execFile()
        }).toThrow("File not found!");
      });
    });
  });
});
