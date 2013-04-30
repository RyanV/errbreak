ErrBreak.singleton = function(klass) {
  klass.getInstance = function() {
    if (!klass._instance) {
      klass._instance = new klass();
    }
    return klass._instance;
  };
};
