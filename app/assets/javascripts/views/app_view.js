(function(){
  ErrBreak.Views.AppView = ErrBreak.View.extend({
    initialize: function() {
      this.notifications = ErrBreak.Collections.Notifications.getInstance();
      this.render();
      return this;
    },
    render: function() {
      console.info(this.notifications.toJSON());
      this.$el.html(this.renderTemplate("app", {notifications: this.notifications.toJSON()}));
      return this;
    }
  });
}());
