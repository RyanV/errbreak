var path = require('path'), Task = require('./task');

function TaskBuilder(basename) {
  this._tasks = [];
  this._namespace = [basename];
}

TaskBuilder.prototype.task = function(name, desc, fn) {
  this._tasks.push(new Task(this._namespace.slice(), name, desc, fn));
};

TaskBuilder.prototype.namespace = function(namespace, taskConstructor) {
  if (!taskConstructor) {
    this._namespace = [namespace];
  } else {
    var newNamespace = this._namespace.slice();
    newNamespace.push(namespace);
    newNamespace = newNamespace.join(":");
    var subBuilder = new TaskBuilder(newNamespace);
    var result = taskConstructor(subBuilder);
    subBuilder._tasks.forEach(function(task) {
      TaskBuilder.registerTask.apply(this, task.format());
    });
  }
};

TaskBuilder.build = function(filepath, taskMod) {
  var basename = path.basename(filepath).replace(/\.js$/, '');
  var builder = new TaskBuilder(basename);
  var result = taskMod(builder);

  builder._tasks.forEach(function(task) {
    TaskBuilder.registerTask.apply(this, task.format());
  });
};

module.exports = TaskBuilder;
