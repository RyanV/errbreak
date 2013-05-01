(function() {
  ErrBreak.View = Backbone.View.extend({
    renderTemplate: function(path, opts) {
      return ErrBreak.templates[path](opts);
    }
  });
}());
