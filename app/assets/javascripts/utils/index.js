_.extend(ErrBreak.Utils, {
  isBlank: function(a) {
    return _.isUndefined(a) || _.isNull(a) || /^\s*$/.test(a);
  }
});
