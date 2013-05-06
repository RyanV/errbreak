ErrBreakRouter.Router = ErrBreakRouter.BaseRouter.extend({
  constructor: function(a) {
    this._generateRoutes();
    this._namedParam = /:\w+/g;
    this._scrollPositionTimer = -1;
    this._task = [];
    this._taskMaster = null;
    this._taskTimeout = 120000;
    ErrBreakRouter.BaseRouter.apply(this, [ a ]);
  },
  initialize: function() {
    this.attachRootEl();
  },
  _generateRoutes: function() {
    this._oldRoutes = _.extend({}, this.routes);
    for (var route in this.routes) {
      if (this[this.routes[route]] == null) {
        this.routes[route] = "action placeholder"
      }
    }
  }
});

ErrBreakRouter.Router.singleton = function(a) {
  a && (a.getInstance = function() {
    return a._instance == null && (a._instance = new a,
      ErrBreak.Utils.History.registerRouter(a._instance)),
      a._instance;
  });
};
