var grunt = require('grunt')
  , path = require('path')
  , TaskBuilder = require("./task-manager/task-builder");

function TaskManager() {
  grunt.help.initTasks();
}

TaskManager.prototype.loadTask = function(taskPath) {
  taskPath = path.extname(taskPath) ? taskPath : taskPath + ".js";
  if (!grunt.file.exists(taskPath)) {
    throw "Task not found!";
  } else {
    var mod = require(path.join(__dirname, "../../", taskPath));
  }

  var build = TaskBuilder.build(taskPath, mod);
//  this.registerTask();
};

var registerTask = function(name, desc, fn) {
  grunt.registerTask(name, desc, fn);
};

TaskBuilder.registerTask = registerTask;

TaskManager.prototype.tasks = function() {
  return grunt.task._tasks;
};

module.exports = new TaskManager;
