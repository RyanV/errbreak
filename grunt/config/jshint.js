module.exports = {
  beforeConcat: ['app/assets/javascripts/**/*.js'],
  afterConcat: [
    'public/assets/javascripts/application.js'
  ],
  spec: [
    'spec/client/**/*_spec.js'
  ],
  options: {
    /* While it's possible that we could be considering unwanted prototype methods, mostly
     * we're doing this because the objects are being used as maps.
     */
    forin: false,

    /* We're fine with functions defined inside loops (setTimeout functions, etc) */
    loopfunc: true
  }
};
