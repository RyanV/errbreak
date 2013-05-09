var glob = require("glob"),
  _ = require("underscore")._;

module.exports = {
  index: function(req, res) {
    glob("spec/client/**/*_spec.js", function(err, files) {
      var f = _.map(files, function(file) {
        return file.replace("spec/client/", "");
      });
      res.locals = {spec_files: f};
      res.render("spec_runner.hbs");
    });
  }
};
