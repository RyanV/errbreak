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
