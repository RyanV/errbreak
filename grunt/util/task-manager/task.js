function Task(namespace, name, desc, fn) {
  this.namespace = namespace;
  this.name = name;
  this.description = desc;
  this.fn = fn;
}

Task.prototype.format = function() {
  var namespace = this.namespace.slice();
  namespace.push(this.name);
  var taskName = namespace.join(":");
  return [taskName, this.description, this.fn];
}

module.exports = Task;
