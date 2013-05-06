var child_process = require('child_process'),
  kexec = require("kexec"),
  path = require('path'),
  fs   = require('fs');

module.exports = {
  runServerSpecs: function() {
    console.warn("Be sure that the server is running for specs to run");
    kexec("jasmine-node spec/server");
  },
  runClientSpecs: function() {
    console.warn("Be sure that the server is running for specs to run");
    kexec("jasmine-node spec/client");
  }
};
