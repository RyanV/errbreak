(function() {
  if (!jasmine) {
    throw new Exception("jasmine library does not exist in global namespace!");
  }

  /**
   * Basic reporter that outputs spec results to the browser console.
   * Useful if you need to test an html page and don't want the TrivialReporter
   * markup mucking things up.
   *
   * Usage:
   *
   * jasmine.getEnv().addReporter(new jasmine.ConsoleReporter());
   * jasmine.getEnv().execute();
   */
  var JSONReporter = function() {
    this.started = false;
    this.finished = false;
    this.results = [];
    this.failedCount = 0;
    this.passedCount = 0;
    this.passed = [];
    this.failed = [];
  };

  JSONReporter.prototype = {
    jasmineStarted: function(options) {
      this.started = true;
    },
    specDone: function(result) {
      this.results.push(result);
      this[result.status + "Count"]++;
      this[result.status].push(result);
    },
    jasmineDone: function() {
      this.finished = true;
      document.body.innerText = JSON.stringify(this);
    }
  };

  // export public
  jasmine.JSONReporter = JSONReporter;
})();
