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
