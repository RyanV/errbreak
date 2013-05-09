var support = require("support").exec(__filename);
var TaskManager = support.require("grunt/util/task-manager");

describe('TaskManager', function() {
  beforeEach(function() {
    support.tempfile.deleteAll();
  });

  describe("#tasks", function() {
    it("returns a list of the current tasks", function() {
      var tasks = TaskManager.tasks();
      expect(_.size(tasks)).toBeTruthy();
    });
  });

  // currently getting errors in file creation
  xdescribe("#loadTasks", function() {
    it("should find and register all tasks in the given directory", function() {
      var directory = support.tempfile.createDir('tasks');
      directory.addFiles('task_manger/taskfile.js', 'task_manger/override_basename.js');
      directory.deleteAll();
    });
  });

  describe("#loadTask", function() {
    var tmpfile, tasks;

    beforeEach(function() {
      tmpfile = support.tempfile.create('task_manager/taskfile.js');
      expect(tmpfile.exists()).toEqual(true);
    });

    it("should throw an error if file does not exist", function() {
      expect(function() {
        TaskManager.loadTask("random/path/to/file");
      }).toThrow("Task not found!");
    });

    it("should does not throw an error if file exists | given path without extension", function() {
      expect(function() {
        TaskManager.loadTask(tmpfile.path.replace(/\.js$/, ''));
      }).not.toThrow();
    });

    it("should does not throw an error if file exists | given path with extension", function() {
      expect(function() {
        TaskManager.loadTask(tmpfile.path);
      }).not.toThrow();
    });

    it("reads in the file and registers the tasks", function() {
      tasks = TaskManager.tasks();
      var taskName = tmpfile.name + ":aRandomSpecTaskName";
      expect(tasks[taskName]).toBeFalsy();
      TaskManager.loadTask(tmpfile.path);
      tasks = TaskManager.tasks();
      var task = tasks[taskName];
      expect(task.name).toEqual(taskName);
      expect(task.info).toEqual("aRandomSpecTaskName description");
      expect(typeof task.fn).toEqual("function");
    });

    it("allows the user to override the namespace", function() {
      tmpfile = support.tempfile.create('task_manager/override_basename.js');
      tasks = TaskManager.tasks();
      expect(tasks["overrideBasename:fooTask"]).toBeFalsy();
      TaskManager.loadTask(tmpfile.path);
      tasks = TaskManager.tasks();
      var task = tasks["overrideBasename:fooTask"];
      expect(task).toBeTruthy();
      expect(task.name).toEqual("overrideBasename:fooTask");
      expect(task.info).toEqual("it foos");
      expect(typeof task.fn).toEqual("function");
    });

    describe("nested namespacing", function() {
      beforeEach(function() {
        tmpfile = support.tempfile.create('task_manager/nested_namespaces.js')
      });

      it("should build tasks even with nested namespaces", function() {
        var expected1 = {
          name: "nestedNamespaces:fooTask",
          info: "it foos"
        };

        var expected2 = {
          name: "nestedNamespaces:nest1:nestedTask",
          info: "it nests"
        };

        tasks = TaskManager.tasks();

        expect(tasks[expected1.name]).toBeFalsy();
        expect(tasks[expected2.name]).toBeFalsy();

        TaskManager.loadTask(tmpfile.path);

        tasks = TaskManager.tasks();

        var task1 = tasks[expected1.name];
        expect(task1).toBeTruthy();
        expect(task1.name).toEqual(expected1.name);
        expect(task1.info).toEqual(expected1.info);
        expect(typeof task1.fn).toEqual("function");


        var task2 = tasks[expected2.name];
        expect(task2).toBeTruthy();
        expect(task2.name).toEqual(expected2.name);
        expect(task2.info).toEqual(expected2.info);
        expect(typeof task2.fn).toEqual("function");
      });
    });
  });
});
