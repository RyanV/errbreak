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
