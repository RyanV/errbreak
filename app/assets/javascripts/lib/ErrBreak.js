var ErrBreak = {
  Views: {},
  Models: {},
  Collections: {},
  init: function(data) {
    var notifications = ErrBreak.Collections.Notifications.getInstance();
    notifications.add(data.notifications);
    ErrBreak.app = new ErrBreak.Views.AppView({el: "#app-view"});
  }
};
