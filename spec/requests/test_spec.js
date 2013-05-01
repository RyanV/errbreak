var another_funny, phantom;

var phantom = require('phantom'),
  _ = require("underscore")._;

phantom.create(function(ph) {
  return ph.createPage(function(page) {
    console.info(_.methods(page));
    return page.open('http://localhost:3020/', function(status) {
      console.log('Opened site? %s', status);
      ph.exit();
    });
  });
});
