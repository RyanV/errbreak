var grunt = require("grunt"),
  path = require("path"),
  fs = require("fs"),
  _ = require("underscore")._,
  shell = require("shelljs");

function rootRequire(mod) {
  return require(path.join("../..", mod));
}

module.exports.vendor = function() {
  var baseDir = "vendor/assets/javascripts";
  var filesMap = rootRequire(path.join(baseDir, "build.js"));

  // if no files or included, dont move anything
  if (_.size(filesMap)) {

    // throw out the key that is just used for naming
    // TODO: maybe just use Key as source, and value as destination or vice versa
    filesMap = _.map(filesMap, function(value, key) {
      return value;
    });

    // Iterate over array of {src: "path/to/src", dest: "path/to/dest"}
    // reading source and writing to destination.
    _.each(filesMap, function(map) {
      var f = grunt.file.read(map.src, {encoding: "utf8"});
      grunt.file.write(map.dest, f, {encoding: "utf8"});
    });
  }
};

module.exports.assets = function() {
//  var baseDir = "app/assets/javascripts";
//  var filesMap = rootRequire(path.join(baseDir, "build.js"));

};

module.exports.templates = function() {
  shell.exec("handlebars client/application/templates/* --namespace ErrBreak.templates --root client/application/templates -f public/assets/templates.js");
};
