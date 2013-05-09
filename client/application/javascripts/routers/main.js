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
