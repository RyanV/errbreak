var ErrBreak = {
  Views: {},
  Models: {},
  Collections: {},
  Routers: {},
  Utils: {},
  Events: {},
  init: function(data) {
    ErrBreak.router = ErrBreak.Routers.Main.getInstance();
    ErrBreak.header = ErrBreak.Routers.Header.getInstance();
    ErrBreak.footer = ErrBreak.Routers.Footer.getInstance();
  }
};

ErrBreak.Events.Router = {
  "BEFORE_SWAP": "ErrBreak.Events.Router.BEFORE_SWAP",
  "AFTER_SWAP": "ErrBreak.Events.Router.AFTER_SWAP",
  "SWAP_FAILED": "ErrBreak.Events.Router.SWAP_FAILED"
};

ErrBreak.singleton = function(Klass) {
  Klass.getInstance = function() {
    if (!Klass._instance) {
      Klass._instance = new Klass();
    }
    return Klass._instance;
  };
};

/**
 *
 * {
 *    _tables: {
 *      "CONTENT": {
 *        classConstructor: ErrBreak.Content,
 *        data: {
 *          123: {
 *            last_updated: 4412314123,
 *            data: {
 *              id: 123,
 *              name: "contentName"
 *            }
 *          },
 *          15332: {
 *            last_updated: 5433134614,
 *            data: {
 *              id: 15332,
 *              anotherKey: "value"
 *            }
 *          }
 *        }
 *      },
 *      "PRODUCT": {
 *        classConstructor: ErrBreak.Product,
 *        data: {
 *        }
 *      }
 *    }
 * }
 */

ErrBreak.Datastore = {
  _tables: {},
  _reset: function() {
    ErrBreak.Datastore._tables = {};
  },
  find: function(dataType, options) {

  },
  save: function(dataType, data) {
//    if (!_.isEmpty(dataType) || !_.isString(dataType)) {
//      throw new Error("data-type must be a non-empty string");
//    }
  },
  registerType: function(dataType, options) {

  }
};

(function() {
  ErrBreak.Model = Backbone.Model.extend({

  });
}());

(function(){
  ErrBreak.Collection = Backbone.Collection.extend({

  });
}());

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

ErrBreak.Router = Support.SwappingRouter.extend({

});

_.extend(ErrBreak.Utils, {
  isBlank: function(a) {
    return _.isUndefined(a) || _.isNull(a) || /^\s*$/.test(a);
  }
});

ErrBreak.Utils.History = {
  _routers: {},
  registerRouter: function(router) {
    var validRouter = router != null && router instanceof ErrBreakRouter.BaseRouter;
    if (!(validRouter)) {
      throw new Error("History.registerRouter only accept a non-null router instance!");
    }
    if (ErrBreak.Utils.isBlank(router.name)) {
      return;
    }
    if (this._routers.hasOwnProperty(router.name)) {
      throw new Error("Already registered the router with name '" + router.name + "'!");
    }
    this._routers[router.name] = router;
  }
};

(function(){
  ErrBreak.Models.Notification = ErrBreak.Model.extend({
    toJSON: function() {
      var json = _.clone(this.attributes);
      return _.extend(json, {
        created_at: moment(json.created_at).fromNow()
      });
    }
  });
}());

(function(){
  ErrBreak.Collections.Notifications = ErrBreak.Collection.extend({
    model: function(attrs, opts) {
      return new ErrBreak.Models.Notification(attrs, opts);
    }
  });
  ErrBreak.singleton(ErrBreak.Collections.Notifications);
}());

ErrBreak.Views.BaseView = Backbone.View.extend({

});

(function(){
  ErrBreak.Views.AppView = ErrBreak.View.extend({
    initialize: function() {
      this.notifications = ErrBreak.Collections.Notifications.getInstance();
      this.render();
      return this;
    },
    render: function() {
      this.$el.html(this.renderTemplate("app", {notifications: this.notifications.toJSON()}));
      return this;
    }
  });
}());

ErrBreak.Views.Header = ErrBreak.Views.BaseView.extend({

});

ErrBreak.Views.Footer = ErrBreak.Views.BaseView.extend({

});

ErrBreakRouter = {};

ErrBreakRouter.Broadcaster = _.extend({}, Backbone.Events);

ErrBreakRouter.BaseRouter = Support.SwappingRouter.extend({
  name: null,
  attachRootEl: function() {
    throw new Error("Not implemented!");
  },
  getHistoryState: function() {
//    return ErrBreak.Utils.History.getRouterState(this);
  },
  serializeState: function(a) {
//    return this.getMainView() ? this.getMainView().serializeState(a) : null;
  },
  deserializeState: function(a) {
//    a == null && (a = this.getHistoryState()), this.getMainView() && this.getMainView().deserializeState(a);
  },
  getMainView: function() {
//    throw new Error("Not implemented!");
  }
});

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

ErrBreak.Routers.Main = ErrBreakRouter.Router.extend({
  name: "main",
  routes: {
    "": "HomeController.index",
    "foo": "foobar"
  },
  attachRootEl: function() {
    this.el = $("#main");
  }
});

ErrBreakRouter.Router.singleton(ErrBreak.Routers.Main);

ErrBreak.Routers.Header = ErrBreakRouter.PartialRouter.extend({
  attachRootEl: function() {
    console.info("ErrBreak.Routers.Header#attachRootEl");
    this.el = $('#header');
    ErrBreak.headerApp = (ErrBreak.headerApp || new ErrBreak.Views.Header());
    this.view = ErrBreak.headerApp;
  },
  routes: {
    ":assetScope/:browseType": "index",
    ":assetScope/:browseType/:assetType": "index",
    ":assetScope/:browseType/:genreName/:subgenreName": "index",
    "*path": "index"
  },
  index: function (a) {
    console.info("ErrBreak.Routers.Header#index");
    this.swap(ErrBreak.headerApp);
  }
});

ErrBreakRouter.Router.singleton(ErrBreak.Routers.Header);

ErrBreak.Routers.Footer = ErrBreakRouter.PartialRouter.extend({
  attachRootEl: function() {
    console.info("ErrBreak.Routers.Footer#attachRootEl");
    this.el = $("#footer");
    ErrBreak.footerApp || (ErrBreak.footerApp = new ErrBreak.Views.Footer({}));
    this.view = ErrBreak.footerApp;
    this.attachEvents();
  },
  routes: {
    "*path": "index"
  },
  index: function(a) {
    console.info("ErrBreak.Routers.Footer#index");
    this.swap(ErrBreak.footerApp);
  },
  attachEvents: function() {
    console.info("ErrBreak.Routers.Footer#attachEvents");
  }
});

ErrBreakRouter.Router.singleton(ErrBreak.Routers.Footer);
