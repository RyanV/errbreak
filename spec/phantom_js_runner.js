var express = require('express')
  , http = require('http')
  , app = express()
  , server = http.createServer(app)
  , phantom = require("phantom")
  , fs = require("fs")
  , path = require("path")
  , glob = require("glob")
  , Mustache = require("mustache")
  , grunt = require("grunt")
  , colors = require("colors")
  , _ = require("underscore")._
  , PORT = 8080;
;

/**
 * Initialize colors library for better logging
 */
colors.setTheme({
  success: 'green',
  warn: 'yellow',
  error: 'red',
  fail: 'red',
  txt: "white"
});

/**
 * absolute path to project root
 */
var projectRoot = path.resolve(".");

function rootJoin() {
  return path.join.apply(this, [projectRoot].concat(Array.prototype.slice.call(arguments)))
}

var spec_path = rootJoin("spec/client")
  , src_path = rootJoin("public")
  , spec_runner_path = rootJoin("spec/phantom_js_runner.hbs")
  , specFileGlobMatcher = path.join(spec_path, "/**/*_spec.js")
  ;

app.use(express.static(spec_path));
app.use(express.static(src_path));

function mustache(tmpl, opts) {
  return Mustache.to_html(tmpl, opts);
}

function getSpecFiles(cb) {
  glob(specFileGlobMatcher, function(err, spec_files) {
    if (err) {
      cb(err);
    } else {
      spec_files = _.map(spec_files, function(file) {
        return file.replace(spec_path, "")
      });
      cb(null, spec_files);
    }
  });
}

app.get('/jasmine_phantom', function(req, res) {
  var runnerHTML = fs.readFileSync(spec_runner_path, "utf8");
  getSpecFiles(function(err, spec_files) {
    res.send(mustache(runnerHTML, {spec_files: spec_files}));
  });
});

app.listen(PORT);

var jasmineResultsParser = function() {
  try {
    var $body = $(document.body),
      results = $body.find('.alert .bar.failed').text(),
      failures = $body.find(".symbol-summary .failed");

    if (failures.size() === 0) {
      return {
        passed: true,
        results: results
      }
    } else {
      var $failures = $body.find(".results .failures"),
        spec = $failures.find(".failed a").text(),
        error = $failures.find('.result-message').text(),
        stack = $failures.find('.stack-trace').text();

      return {
        passed: false,
        results: results,
        failedSpec: spec,
        errorMessage: error,
        stackTrace: stack
      };
    }
  } catch (err) {
    return "Failed to load the jasmine html test runner";
  }
};

var jasmineSpecLogger = function(result) {
  var results = result.results;

  if (result.passed) {
    console.log("All Specs Passed! %s".success, results);
  } else {
    var jasmineFile = /jasmine.*\.js\:/;
    var expectationResult = /(Expected.*)\s((to|not to).*)/;
    var failedSpec = result.failedSpec;
    var msgMatch = result.errorMessage.match(expectationResult);
    var stackTrace = result.stackTrace.split("\n");
    var expected = msgMatch[1];
    var actual = msgMatch[2];

    var stack = _.select(stackTrace,function(line) {
      return !jasmineFile.test(line) && /[\s\t]+at.*/.test(line);
    }).join("\n");

    console.log(results.error);
    console.log("");
    console.log(failedSpec.txt.underline);
    console.log(expected.warn);
    console.log(actual.warn);
    console.log("");
    console.log("Stack Trace:".txt.underline);
    console.log(stack.txt);
    process.exit();
  }
};

var jasminePhantomUrl = "http://localhost:" + PORT + "/jasmine_phantom";

phantom.create(function(ph) {
  return ph.createPage(function(page) {
    return page.open(jasminePhantomUrl, function(status) {
      return page.evaluate(jasmineResultsParser, jasmineSpecLogger);
    });
  });
});

