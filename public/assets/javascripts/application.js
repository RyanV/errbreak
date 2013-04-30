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

(function() {
  ErrBreak.Model = Backbone.Model.extend({

  });
}());

(function(){
  ErrBreak.Collection = Backbone.Collection.extend({

  });
}());

(function() {
  ErrBreak.View = Backbone.View.extend({
    renderTemplate: function(path, opts) {
      return ErrBreak.templates[path](opts)
    }
  });
}());

ErrBreak.singleton = function(klass) {
  klass.getInstance = function() {
    if (!klass._instance) {
      klass._instance = new klass();
    }
    return klass._instance;
  };
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
