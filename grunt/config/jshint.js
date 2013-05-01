var path = require("path");

module.exports = {
  beforeConcat: ['app/assets/javascripts/**/*.js'],
  afterConcat: [
    'public/assets/javascripts/application.js'
  ],
  spec: [
    'spec/**/*_spec.js'
  ],
  all: [
    'grunt/**/*.js',
    'lib/**/*.js',
    'public/assets/javascripts/application.js',
    'routes/**/*.js',
    'app/assets/javascripts/**/*.js',
    'spec/**/*_spec.js',
    'Gruntfile.js'
  ],

  options: {
    /* While it's possible that we could be considering unwanted prototype methods, mostly
     * we're doing this because the objects are being used as maps.
     */
    forin: false,

    /* We're fine with functions defined inside loops (setTimeout functions, etc) */
    loopfunc: true,

    /* default options */
    "curly": true,
    "eqeqeq": true,
    "immed": true,
    "latedef": true,
    "newcap": true,
    "noarg": true,
    "sub": true,
    "undef": true,
    "boss": true,
    "eqnull": true,
    "node": true,
    "es5": true,
    laxcomma: true,
    "-W030": true,
    globals: {
      /* jasmine globals */
      jasmine: true,
      expect: true,
      describe: true,
      it: true,
      beforeEach: true,
      afterEach: true,
      spyOn: true,
      /* Application Globals */
      ErrBreak: true,
      /* Framework Globals */
      Backbone: true,
      _: true,
      moment: true
    }
  }
};
