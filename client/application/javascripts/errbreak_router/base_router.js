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
