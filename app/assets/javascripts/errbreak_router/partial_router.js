ErrBreakRouter.PartialRouter = ErrBreakRouter.BaseRouter.extend({
  constructor: function(a) {
    this.subHandlers = [];
    ErrBreakRouter.BaseRouter.apply(this, [a]);

  },
  initialize: function() {
    this.attachRootEl();
    ErrBreakRouter.Broadcaster.on(ErrBreak.Events.Router.BEFORE_SWAP, _.bind(this.beforeSwap, this));
    ErrBreakRouter.Broadcaster.on(ErrBreak.Events.Router.AFTER_SWAP, _.bind(this.afterSwap, this));
    ErrBreakRouter.Broadcaster.on(ErrBreak.Events.Router.SWAP_FAILED, _.bind(this.swapFailed, this));
  },
  route: function(route, routeFunc, callback) {
    console.info("ErrBreakRouter.PartialRouter.prototype.route", arguments);
    var rawRoute = route;
    _.isRegExp(route) || (route = this._routeToRegExp(route));
    callback || (callback = this[routeFunc]);

    this.subHandlers.unshift({
      rawRoute: rawRoute,
      route: route,
      callback: callback
    });
    return this;
  },
  beforeSwap: function() {
    return this._onSwap("before");
  },
  afterSwap: function() {
    ErrBreak.Utils.DOM.insertIframehack();
    return this._onSwap("after");
  },
  swapFailed: function() {
    return this._onSwap("failed");
  },
  swap: function(newView) {
    if (this.currentView == newView) {
      return;
    }
    if (this.currentView && this.currentView.leave) {
      this.currentView.leave();
    }
    this.currentView = newView;
    $(this.el).empty().append(this.currentView.render().el);
//    this.currentView.markAddedToDomTree(); // baseView
  },
  _onSwap: function(swapEvent) {
    var self = this;
    var c = _.any(this.subHandlers, function(subHandler) {
      var fragment = Backbone.history.getFragment();
      if (subHandler.route.test(fragment)) {
        var parameters = self._extractParameters(subHandler.route, fragment);
        self.params = ErrBreak.Utils.Url.assembleParams(subHandler.rawRoute, parameters);
        subHandler.callback.apply(self, [swapEvent].concat(parameters));
        return true;
      }
      return false;
    });
    return c;
  }
});
