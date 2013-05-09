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
