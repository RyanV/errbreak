var sys = require('sys'),
  cp = require("child_process"),
  fork = cp.fork,
  exec = cp.exec,
  child;

module.exports = function(grunt) {
  var appFiles = require("./app/assets/javascripts/manifest.js");
  grunt.initConfig({
    concat: require("./grunt/config/concat"),
    watch: require("./grunt/config/watch"),
    jshint: require("./grunt/config/jshint"),
    spec: {
      runServerSpecs: {
        dir: "spec/server"
      },
      runLibrarySpecs: {
        dir: "spec/lib"
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-jshint");

  grunt.registerTask("default", ["jshint:all"]);


  var spec = require("./grunt/tasks/spec");

  grunt.registerMultiTask("spec", "runs different spec configurations", function() {
    this.async();
    var options = this.options();
    var directory = this.data.dir || "spec";
    var runner = this.data.runner || "./node_modules/jasmine-node/bin/jasmine-node";
    var command = [runner, directory].join(" ");
    var terminal = require('child_process').spawn('bash');

    terminal.stdout.on('data', function (data) {
      sys.print(data);
    });

    terminal.on('exit', function (code) {
      console.log('child process exited with code ' + code);
    });

    terminal.stdin.write(command);
    terminal.stdin.end();
  });

//  grunt.registerTask("spec:runServerSpecs", "run server side specs", spec.runServerSpecs);
//  grunt.registerTask("spec:runLibSpecs", "run library specs", spec.runLibrarySpecs);

  var build = require("./grunt/tasks/build");

  grunt.registerTask("build:templates", "builds templates", build.templates);

  grunt.registerTask("build:assets",
    "Builds assets for client side use",
    build.assets
  );

  grunt.registerTask("build:vendor",
    "Builds vendor files for client side use",
    build.vendor
  );

  var db = require("./grunt/tasks/db");
  grunt.registerTask("db:create", "creates the database", db.create);
};
