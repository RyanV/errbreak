ErrBreak.singleton = function(Klass) {
  Klass.getInstance = function() {
    if (!Klass._instance) {
      Klass._instance = new Klass();
    }
    return Klass._instance;
  };
};
