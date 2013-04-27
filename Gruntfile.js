module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      files: ["app/**/*.js", "server.js"],
      tasks: ["server:start"]
    }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");

//  grunt.registerTask("server:start", "starts the server", function() {
//    require("child_process").exec("node server.js");
//    grunt.task.run("watch");
//  });
};
