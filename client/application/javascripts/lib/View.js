ErrBreak.View = Support.CompositeView.extend({
  initialize: function(attrs) {
    this._renderStart = new Date();
    this._renderReady = false;
    this.renderFramework();
    this.renderInternal();
    return this;
  },
  renderInternal: function () {},
  renderFramework: function () {
    if (this._template == null) {
      throw new Error("Must specify the template in constructor options, or override renderFramework to render the template and attach to root!");
    }
    this.$el.html(this.renderTemplate(this._template));
  },
  renderTemplate: function(path, opts) {
    return ErrBreak.templates[path](opts);
  }
});
