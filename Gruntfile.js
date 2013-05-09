var sys = require('sys'),
  cp = require("child_process"),
  fork = cp.fork,
  exec = cp.exec,
  child;

module.exports = function(grunt) {
//  var appFiles = require("./app/assets/javascripts/manifest.js");
  grunt.initConfig({
//    concat: require("./grunt/config/concat"),
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

  grunt.loadTasks("/grunt/tasks");
//  var db = require("./grunt/tasks/db");
//  grunt.registerTask("db:create", "creates the database", db.create);

  grunt.registerTask("compile", "compiles", function() {
    var glob = require("glob");
    var path = require("path");
    var _ = require("underscore")._;
    var root = {
      require: function(mod) {
        return require(path.join(__dirname, mod));
      },
      join: function() {
        return path.join.apply(__dirname, Array.prototype.slice.call(arguments));
      }
    };
    var grunt = require("grunt");
    var assetmap = root.require("client/manifest");
    var javascripts = assetmap.javascripts;
    var stylesheets = assetmap.stylesheets;
    var templates = assetmap.templates;

    _.each(javascripts, function(options, outputfile) {
      var loadPath = options.loadPath || "";
      var assetsDir = root.join("client", loadPath);
      var destination = root.join("public/assets", outputfile);
      var files = (options.files || []).map(function(filepath) {
        return root.join(assetsDir, filepath);
      });

      var src = files.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
          var src = grunt.file.read(filepath);
          return src;
        }).join(grunt.util.linefeed);

      // Write the destination file.
      grunt.file.write(destination, src);

      // Print a success message.
      grunt.log.writeln('File "' + destination + '" created.');
    });
  });
};
